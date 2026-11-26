import { Phenotype, Grade } from "/myskincode-ai/src/types.ts";
export const PHENOTYPE_DETAILS = {
	[Phenotype.SEB]: {
		label: "Łojotokowa",
		description: "Nadmierna produkcja sebum, skłonność do zmian zapalnych.",
		color: "bg-navy-900 text-blue-300 border-blue-900/50 shadow-[0_0_15px_rgba(59,130,246,0.05)]"
	},
	[Phenotype.XER]: {
		label: "Sucha",
		description: "Niedobór lipidów, uczucie ściągnięcia, szorstkość.",
		color: "bg-navy-900 text-slate-300 border-slate-800/50 shadow-[0_0_15px_rgba(203,213,225,0.05)]"
	},
	[Phenotype.VAS]: {
		label: "Naczynkowa",
		description: "Rumień, teleangiektazje, nadreaktywność.",
		color: "bg-navy-900 text-rose-300 border-rose-900/50 shadow-[0_0_15px_rgba(244,63,94,0.05)]"
	},
	[Phenotype.AGE]: {
		label: "Dojrzała",
		description: "Utrata jędrności, zmarszczki, fotouszkodzenia.",
		color: "bg-navy-900 text-indigo-300 border-indigo-900/50 shadow-[0_0_15px_rgba(99,102,241,0.05)]"
	},
	[Phenotype.OIL]: {
		label: "Tłusta",
		description: "Błyszczenie, rozszerzone ujścia gruczołów.",
		color: "bg-navy-900 text-cyan-300 border-cyan-900/50 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
	},
	[Phenotype.MIX]: {
		label: "Mieszana",
		description: "Strefa T tłusta, policzki suche/normalne.",
		color: "bg-navy-900 text-teal-300 border-teal-900/50 shadow-[0_0_15px_rgba(20,184,166,0.05)]"
	},
	[Phenotype.NOR]: {
		label: "Normalna",
		description: "Pełna równowaga hydrolipidowa.",
		color: "bg-navy-900 text-emerald-300 border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
	},
	[Phenotype.CIC]: {
		label: "Z bliznami",
		description: "Zmiany strukturalne, blizny potrądzikowe.",
		color: "bg-navy-900 text-zinc-300 border-zinc-800/50 shadow-[0_0_15px_rgba(161,161,170,0.05)]"
	},
	[Phenotype.REM]: {
		label: "Przebudowana",
		description: "Skóra po intensywnych zabiegach hi-tech.",
		color: "bg-navy-900 text-silver-300 border-silver-800/50 shadow-[0_0_15px_rgba(203,213,225,0.1)]"
	}
};
export const GRADE_DETAILS = {
	[Grade.G0]: {
		label: "Równowaga",
		description: "Stan optymalny, brak defektów."
	},
	[Grade.G1]: {
		label: "Powierzchowny",
		description: "Zmiany w naskórku, łatwe do korekty."
	},
	[Grade.G2]: {
		label: "Strukturalny",
		description: "Zmiany w skórze właściwej, wymagają stymulacji."
	},
	[Grade.G3]: {
		label: "Utrwalony",
		description: "Głębokie zmiany, wymagają intensywnych procedur."
	}
};

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxXQUFXLGFBQWE7QUFFakMsT0FBTyxNQUFNLG9CQUE4RjtFQUN4RyxVQUFVLE1BQU07RUFBRSxPQUFPO0VBQWMsYUFBYTtFQUE0RCxPQUFPO0NBQXVGO0VBQzlNLFVBQVUsTUFBTTtFQUFFLE9BQU87RUFBUyxhQUFhO0VBQXNELE9BQU87Q0FBMEY7RUFDdE0sVUFBVSxNQUFNO0VBQUUsT0FBTztFQUFjLGFBQWE7RUFBNEMsT0FBTztDQUFzRjtFQUM3TCxVQUFVLE1BQU07RUFBRSxPQUFPO0VBQVksYUFBYTtFQUFrRCxPQUFPO0NBQTJGO0VBQ3RNLFVBQVUsTUFBTTtFQUFFLE9BQU87RUFBVSxhQUFhO0VBQThDLE9BQU87Q0FBc0Y7RUFDM0wsVUFBVSxNQUFNO0VBQUUsT0FBTztFQUFZLGFBQWE7RUFBNkMsT0FBTztDQUF1RjtFQUM3TCxVQUFVLE1BQU07RUFBRSxPQUFPO0VBQVksYUFBYTtFQUFrQyxPQUFPO0NBQTZGO0VBQ3hMLFVBQVUsTUFBTTtFQUFFLE9BQU87RUFBYyxhQUFhO0VBQTZDLE9BQU87Q0FBd0Y7RUFDaE0sVUFBVSxNQUFNO0VBQUUsT0FBTztFQUFnQixhQUFhO0VBQTRDLE9BQU87Q0FBMkY7QUFDdk07QUFFQSxPQUFPLE1BQU0sZ0JBQXVFO0VBQ2pGLE1BQU0sS0FBSztFQUFFLE9BQU87RUFBYSxhQUFhO0NBQWlDO0VBQy9FLE1BQU0sS0FBSztFQUFFLE9BQU87RUFBaUIsYUFBYTtDQUF1QztFQUN6RixNQUFNLEtBQUs7RUFBRSxPQUFPO0VBQWdCLGFBQWE7Q0FBa0Q7RUFDbkcsTUFBTSxLQUFLO0VBQUUsT0FBTztFQUFhLGFBQWE7Q0FBbUQ7QUFDcEciLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiY29uc3RhbnRzLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBoZW5vdHlwZSwgR3JhZGUgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IFBIRU5PVFlQRV9ERVRBSUxTOiBSZWNvcmQ8UGhlbm90eXBlLCB7IGxhYmVsOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmcgfT4gPSB7XG4gIFtQaGVub3R5cGUuU0VCXTogeyBsYWJlbDogJ8WBb2pvdG9rb3dhJywgZGVzY3JpcHRpb246ICdOYWRtaWVybmEgcHJvZHVrY2phIHNlYnVtLCBza8WCb25ub8WbxIcgZG8gem1pYW4gemFwYWxueWNoLicsIGNvbG9yOiAnYmctbmF2eS05MDAgdGV4dC1ibHVlLTMwMCBib3JkZXItYmx1ZS05MDAvNTAgc2hhZG93LVswXzBfMTVweF9yZ2JhKDU5LDEzMCwyNDYsMC4wNSldJyB9LFxuICBbUGhlbm90eXBlLlhFUl06IHsgbGFiZWw6ICdTdWNoYScsIGRlc2NyaXB0aW9uOiAnTmllZG9iw7NyIGxpcGlkw7N3LCB1Y3p1Y2llIMWbY2nEhWduacSZY2lhLCBzem9yc3Rrb8WbxIcuJywgY29sb3I6ICdiZy1uYXZ5LTkwMCB0ZXh0LXNsYXRlLTMwMCBib3JkZXItc2xhdGUtODAwLzUwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSgyMDMsMjEzLDIyNSwwLjA1KV0nIH0sXG4gIFtQaGVub3R5cGUuVkFTXTogeyBsYWJlbDogJ05hY3p5bmtvd2EnLCBkZXNjcmlwdGlvbjogJ1J1bWllxYQsIHRlbGVhbmdpZWt0YXpqZSwgbmFkcmVha3R5d25vxZvEhy4nLCBjb2xvcjogJ2JnLW5hdnktOTAwIHRleHQtcm9zZS0zMDAgYm9yZGVyLXJvc2UtOTAwLzUwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSgyNDQsNjMsOTQsMC4wNSldJyB9LFxuICBbUGhlbm90eXBlLkFHRV06IHsgbGFiZWw6ICdEb2pyemHFgmEnLCBkZXNjcmlwdGlvbjogJ1V0cmF0YSBqxJlkcm5vxZtjaSwgem1hcnN6Y3praSwgZm90b3VzemtvZHplbmlhLicsIGNvbG9yOiAnYmctbmF2eS05MDAgdGV4dC1pbmRpZ28tMzAwIGJvcmRlci1pbmRpZ28tOTAwLzUwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSg5OSwxMDIsMjQxLDAuMDUpXScgfSxcbiAgW1BoZW5vdHlwZS5PSUxdOiB7IGxhYmVsOiAnVMWCdXN0YScsIGRlc2NyaXB0aW9uOiAnQsWCeXN6Y3plbmllLCByb3pzemVyem9uZSB1asWbY2lhIGdydWN6b8WCw7N3LicsIGNvbG9yOiAnYmctbmF2eS05MDAgdGV4dC1jeWFuLTMwMCBib3JkZXItY3lhbi05MDAvNTAgc2hhZG93LVswXzBfMTVweF9yZ2JhKDYsMTgyLDIxMiwwLjA1KV0nIH0sXG4gIFtQaGVub3R5cGUuTUlYXTogeyBsYWJlbDogJ01pZXN6YW5hJywgZGVzY3JpcHRpb246ICdTdHJlZmEgVCB0xYJ1c3RhLCBwb2xpY3praSBzdWNoZS9ub3JtYWxuZS4nLCBjb2xvcjogJ2JnLW5hdnktOTAwIHRleHQtdGVhbC0zMDAgYm9yZGVyLXRlYWwtOTAwLzUwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSgyMCwxODQsMTY2LDAuMDUpXScgfSxcbiAgW1BoZW5vdHlwZS5OT1JdOiB7IGxhYmVsOiAnTm9ybWFsbmEnLCBkZXNjcmlwdGlvbjogJ1BlxYJuYSByw7N3bm93YWdhIGh5ZHJvbGlwaWRvd2EuJywgY29sb3I6ICdiZy1uYXZ5LTkwMCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlci1lbWVyYWxkLTkwMC81MCBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoMTYsMTg1LDEyOSwwLjA1KV0nIH0sXG4gIFtQaGVub3R5cGUuQ0lDXTogeyBsYWJlbDogJ1ogYmxpem5hbWknLCBkZXNjcmlwdGlvbjogJ1ptaWFueSBzdHJ1a3R1cmFsbmUsIGJsaXpueSBwb3RyxIVkemlrb3dlLicsIGNvbG9yOiAnYmctbmF2eS05MDAgdGV4dC16aW5jLTMwMCBib3JkZXItemluYy04MDAvNTAgc2hhZG93LVswXzBfMTVweF9yZ2JhKDE2MSwxNjEsMTcwLDAuMDUpXScgfSxcbiAgW1BoZW5vdHlwZS5SRU1dOiB7IGxhYmVsOiAnUHJ6ZWJ1ZG93YW5hJywgZGVzY3JpcHRpb246ICdTa8OzcmEgcG8gaW50ZW5zeXdueWNoIHphYmllZ2FjaCBoaS10ZWNoLicsIGNvbG9yOiAnYmctbmF2eS05MDAgdGV4dC1zaWx2ZXItMzAwIGJvcmRlci1zaWx2ZXItODAwLzUwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSgyMDMsMjEzLDIyNSwwLjEpXScgfVxufTtcblxuZXhwb3J0IGNvbnN0IEdSQURFX0RFVEFJTFM6IFJlY29yZDxHcmFkZSwgeyBsYWJlbDogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nIH0+ID0ge1xuICBbR3JhZGUuRzBdOiB7IGxhYmVsOiAnUsOzd25vd2FnYScsIGRlc2NyaXB0aW9uOiAnU3RhbiBvcHR5bWFsbnksIGJyYWsgZGVmZWt0w7N3LicgfSxcbiAgW0dyYWRlLkcxXTogeyBsYWJlbDogJ1Bvd2llcnpjaG93bnknLCBkZXNjcmlwdGlvbjogJ1ptaWFueSB3IG5hc2vDs3JrdSwgxYJhdHdlIGRvIGtvcmVrdHkuJyB9LFxuICBbR3JhZGUuRzJdOiB7IGxhYmVsOiAnU3RydWt0dXJhbG55JywgZGVzY3JpcHRpb246ICdabWlhbnkgdyBza8OzcnplIHfFgmHFm2Npd2VqLCB3eW1hZ2FqxIUgc3R5bXVsYWNqaS4nIH0sXG4gIFtHcmFkZS5HM106IHsgbGFiZWw6ICdVdHJ3YWxvbnknLCBkZXNjcmlwdGlvbjogJ0fFgsSZYm9raWUgem1pYW55LCB3eW1hZ2FqxIUgaW50ZW5zeXdueWNoIHByb2NlZHVyLicgfVxufTtcbiJdfQ==