import type { Store, Offering, Category, OfferingType } from "@/lib/types";
import { STORES } from "@/lib/mock/creators";

const API_KEY = process.env.SHEETS_API_KEY!;
const SPREADSHEET_ID = process.env.SHEETS_SPREADSHEET_ID!;

async function fetchRange(range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`;
  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.values ?? []).slice(1); // drop header row
  } catch {
    return [];
  }
}

// Col order: A=id, B=handle, C=businessName, D=role, E=bio, F=about, G=buyers,
//            H=cat, I=abbr, J=featured, K=topics, L=ownerName,
//            M=twitter, N=youtube, O=linkedin, P=instagram, Q=website
function parseStoreRow(row: string[]): Omit<Store, "offerings"> | null {
  const id = parseInt(row[0] ?? "");
  const handle = (row[1] ?? "").trim();
  if (isNaN(id) || !handle) return null;

  const twitter   = row[12] || undefined;
  const youtube   = row[13] || undefined;
  const linkedin  = row[14] || undefined;
  const instagram = row[15] || undefined;
  const website   = row[16] || undefined;
  const socials =
    twitter || youtube || linkedin || instagram || website
      ? { twitter, youtube, linkedin, instagram, website }
      : undefined;

  return {
    id,
    handle,
    businessName: row[2] ?? "",
    ownerName:    row[11] ?? "",
    role:         row[3] ?? "",
    bio:          row[4] ?? "",
    about:        row[5] ?? "",
    buyers:       row[6] ?? "",
    cat:          (row[7] ?? "ai") as Category,
    color:        "var(--color-orange)",
    abbr:         row[8] ?? "",
    featured:     row[9]?.toUpperCase() === "TRUE",
    memberSince:  0,
    topics:       row[10] ? row[10].split(",").map((t) => t.trim()).filter(Boolean) : [],
    socials,
  };
}

function parseOfferingRow(
  row: string[]
): { storeId: number; offering: Offering } | null {
  const storeId = parseInt(row[0] ?? "");
  const name = row[1] ?? "";
  if (isNaN(storeId) || !name) return null;

  return {
    storeId,
    offering: {
      name,
      type:   (row[2] ?? "Course") as OfferingType,
      price:  row[3] ?? "",
      desc:   row[4] ?? "",
      buyers: row[5] ?? "",
    },
  };
}

export async function getStores(): Promise<Store[]> {
  try {
    const [storeRows, offeringRows] = await Promise.all([
      fetchRange("creators!A:Q"),
      fetchRange("offerings!A:F"),
    ]);

    const partial = storeRows
      .map(parseStoreRow)
      .filter((s): s is Omit<Store, "offerings"> => s !== null);

    if (partial.length === 0) return STORES;

    const parsedOfferings = offeringRows
      .map(parseOfferingRow)
      .filter((o): o is { storeId: number; offering: Offering } => o !== null);

    const offeringMap = new Map<number, Offering[]>();
    for (const { storeId, offering } of parsedOfferings) {
      if (!offeringMap.has(storeId)) offeringMap.set(storeId, []);
      offeringMap.get(storeId)!.push(offering);
    }

    return partial.map((s) => ({ ...s, offerings: offeringMap.get(s.id) ?? [] }));
  } catch {
    return STORES;
  }
}
