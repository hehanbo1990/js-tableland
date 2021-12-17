import { registerTable } from "./lib/eth-calls";
import * as tablelandCalls from "./lib/tableland-calls";
import connect, { connectionCheck, getSigner } from "./lib/single";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line no-unused-expressions
(globalThis as any).ethereum;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createTable(query: string): Promise<any> {
  connectionCheck();

  // Validation
  const { tableId } = await registerTable();
  tablelandCalls.createTable(query, tableId);
  return tableId;
}

async function runQuery(query: string, tableId: string): Promise<string> {
  connectionCheck();
  console.log(`Running query "${query}" against token ${tableId}`);
  return await tablelandCalls.runQuery(query, tableId);
}

async function myTables() {
  const signer = await getSigner();
  const address = await signer.getAddress();

  const resp = await runQuery(
    `SELECT * FROM system_tables WHERE controller='${address}'`,
    "0x932848feae2d4bfe912fb1e5c949f3fe"
  );
  return resp;
}
export { createTable, runQuery, connect, myTables };
