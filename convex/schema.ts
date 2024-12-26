import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const Schema = defineSchema({
  ...authTables,
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
});

export default Schema;
