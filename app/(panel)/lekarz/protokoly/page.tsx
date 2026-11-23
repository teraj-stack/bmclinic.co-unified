import deviceCatalog from '@/lib/lovable/knowledge-base/device_catalog.json';
import protocolRules from '@/lib/lovable/knowledge-base/protocol_rules.json';
import protocolCl300 from '@/lib/lovable/knowledge-base/protocol_rules_cl300.json';
import protocolEl950 from '@/lib/lovable/knowledge-base/protocol_rules_el950.json';
import protocolPs30 from '@/lib/lovable/knowledge-base/protocol_rules_ps30.json';
import skinPhenotypes from '@/lib/lovable/knowledge-base/skin_phenotypes.json';
import gutPrehab from '@/lib/lovable/knowledge-base/gut_prehab.json';
import LaserProtocolsViewer from '@/components/lovable/LaserProtocolsViewer';

export const metadata = {
  title: 'Protokoły Laserowe i Baza Wiedzy | Panel Lekarza BM Clinic',
};

export default function LekarzProtokolyPage() {
  const bundles = [
    {
      id: 'devices',
      title: 'Katalog Urządzeń',
      subtitle: 'device_catalog.json · zintegrowane z precise-beauty-lab',
      data: deviceCatalog,
    },
    {
      id: 'thulium',
      title: 'Laser Tulowy / Erbowy',
      subtitle: 'protocol_rules.json · modyfikatory skóry, miareczkowanie i override',
      data: protocolRules,
    },
    {
      id: 'cl300',
      title: 'Protokół CL300',
      subtitle: 'protocol_rules_cl300.json · dobór długości fali i szerokości impulsu',
      data: protocolCl300,
    },
    {
      id: 'el950',
      title: 'Protokół EL950',
      subtitle: 'protocol_rules_el950.json · tryby pracy i bezpieczeństwo',
      data: protocolEl950,
    },
    {
      id: 'ps30',
      title: 'Protokół PS30',
      subtitle: 'protocol_rules_ps30.json · parametry i przeciwwskazania',
      data: protocolPs30,
    },
    {
      id: 'phenotypes',
      title: 'Fenotypy Skóry',
      subtitle: 'skin_phenotypes.json · klasyfikacja i modyfikatory',
      data: skinPhenotypes,
    },
    {
      id: 'prehab',
      title: 'Gut Prehab',
      subtitle: 'gut_prehab.json · przygotowanie metaboliczne i aftercare',
      data: gutPrehab,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
          Panel Lekarza · Baza Kliniczna (precise-beauty-lab)
        </p>
        <h1 className="mt-1 text-2xl font-bold">Protokoły Laserowe i Baza Wiedzy</h1>
        <p className="mt-1 text-sm opacity-75">
          Zunifikowane reguły doboru parametrów urządzeń (Tulowy/Erbowy, CL300, EL950, PS30),
          fenotypy skóry i protokół prehab.
        </p>
      </div>

      <LaserProtocolsViewer bundles={bundles} />
    </div>
  );
}
