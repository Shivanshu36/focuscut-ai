import test from "node:test";
import assert from "node:assert/strict";

import { resolveRuntimeEnvValue } from "./razorpay-server";

test("resolveRuntimeEnvValue accepts values from runtime env providers", () => {
  const previousAppEnv = (globalThis as { __APP_ENV__?: Record<string, string | undefined> }).__APP_ENV__;
  const previousRuntimeEnv = (globalThis as { __env__?: Record<string, string | undefined> }).__env__;
  const previousProcessEnv = process.env.RAZORPAY_KEY_ID;
  const previousProcessSecret = process.env.RAZORPAY_KEY_SECRET;

  (globalThis as { __APP_ENV__?: Record<string, string | undefined> }).__APP_ENV__ = {};
  (globalThis as { __env__?: Record<string, string | undefined> }).__env__ = {
    RAZORPAY_KEY_ID: "rzp_test_123",
    RAZORPAY_KEY_SECRET: "secret_456",
  };
  process.env.RAZORPAY_KEY_ID = "";
  process.env.RAZORPAY_KEY_SECRET = "";

  try {
    assert.equal(resolveRuntimeEnvValue("RAZORPAY_KEY_ID"), "rzp_test_123");
    assert.equal(resolveRuntimeEnvValue("RAZORPAY_KEY_SECRET"), "secret_456");
  } finally {
    if (previousAppEnv) {
      (globalThis as { __APP_ENV__?: Record<string, string | undefined> }).__APP_ENV__ = previousAppEnv;
    } else {
      delete (globalThis as { __APP_ENV__?: Record<string, string | undefined> }).__APP_ENV__;
    }

    if (previousRuntimeEnv) {
      (globalThis as { __env__?: Record<string, string | undefined> }).__env__ = previousRuntimeEnv;
    } else {
      delete (globalThis as { __env__?: Record<string, string | undefined> }).__env__;
    }

    if (previousProcessEnv === undefined) {
      delete process.env.RAZORPAY_KEY_ID;
    } else {
      process.env.RAZORPAY_KEY_ID = previousProcessEnv;
    }

    if (previousProcessSecret === undefined) {
      delete process.env.RAZORPAY_KEY_SECRET;
    } else {
      process.env.RAZORPAY_KEY_SECRET = previousProcessSecret;
    }
  }
});
