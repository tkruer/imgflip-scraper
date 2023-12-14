import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const imgFlipMemes = sqliteTable("ImgFlipMemes", {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  memeID: text('memeID'),
  dateString: text('dateString'),
  name: text('name'),
  url: text('url'),
  width: integer('width'),
  height: integer('height'),
  box_count: integer('box_count'),
  captions: integer('captions'),     
})

export type ImgFlipMemes = typeof imgFlipMemes.$inferSelect
export type ImgFlipMemesInsert = typeof imgFlipMemes.$inferInsert
