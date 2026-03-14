#!/usr/bin/env node
import { cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("src/plugin-sdk/root-alias.cjs");
const target = resolve("dist/plugin-sdk/root-alias.cjs");

mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });
