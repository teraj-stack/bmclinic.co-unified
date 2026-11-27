import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import { assertSuperagentSafePayload } from '@/lib/superagentEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 });
    }

    const safety = assertSuperagentSafePayload({ name, email, phone, message });
    if (!safety.allowed) {
      return NextResponse.json(
        { error: safety.verdict.reasoning, cwe_codes: safety.verdict.cwe_codes },
        { status: 403 }
      );
    }

    const inquiryId = `msg-${randomUUID()}`;
    const record = {
      inquiryId,
      createdAt: new Date().toISOString(),
      name,
      email,
      phone,
      message,
    };

    try {
      const dir = path.join(process.cwd(), 'data');
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(
        path.join(dir, 'patient-inquiries.jsonl'),
        JSON.stringify(record) + '\n',
        'utf-8'
      );
    } catch (err) {
      console.error('[kontakt] local ledger write failed:', err);
    }

    let emailSent = false;
    const emailServer = process.env.EMAIL_SERVER?.trim();
    if (emailServer && !emailServer.includes('smtp.dostawca.pl')) {
      try {
        const transporter = nodemailer.createTransport(emailServer);
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || 'kontakt@bujokmedical.pl',
          to: process.env.CONTACT_EMAIL || 'kontakt@bujokmedical.pl',
          replyTo: email,
          subject: `[BM Clinic] Nowe zapytanie od pacjenta: ${name}`,
          text: [
            `ID: ${inquiryId}`,
            `Imię i nazwisko: ${name}`,
            `E-mail: ${email}`,
            `Telefon: ${phone || '(nie podano)'}`,
            '',
            message,
          ].join('\n'),
        });
        emailSent = true;
      } catch (err) {
        console.error('[kontakt] SMTP notification failed:', err);
      }
    }

    return NextResponse.json({ ok: true, inquiryId, savedLocally: true, emailSent });
  } catch {
    return NextResponse.json({ error: 'Nie udało się zapisać wiadomości' }, { status: 502 });
  }
}
