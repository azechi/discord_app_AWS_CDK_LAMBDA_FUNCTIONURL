package main

import (
	"testing"

	"crypto/ed25519"
	"encoding/hex"
	"encoding/json"
)

const (
  private_key = "97d0064c806b4c29957bd3a5e53f1299490609876f2c55bae105dff2245c9f1f"
  public_key = "2a64ff64c5e9ce58bf38faf13cc6153699717b7d88713087758a9688f06ef471"
  timestamp = "1646696920"
  message = "Hello World"
  signature ="e2815eedc16cfd9edf9f97b7721238e7e5349c253d9f8a849ef330666c99516d8389e4bb171c85e840c2cb1d79f21946734127b6f6faf618fc83dbf78b3f4105"
)

func TestJson(t *testing.T) {
  s := `
{
  "headers": {
    "X-Signature-Ed25519": "`+ signature +`",
    "X-Signature-Timestamp": "`+ timestamp +`"
  },

  "body": "`+ message +`"
}
  `

  var req struct{
    Headers struct{
      XSignatureEd25519 string `json:"X-Signature-Ed25519"` 
      XSignatureTimestamp string `json:"X-Signature-Timestamp"`
    }
    Body string
  }
  if err := json.Unmarshal([]byte(s), &req); err != nil {
    panic(err)
  }

  // keyをbyte[]にする
  verifyKey, _ := hex.DecodeString(public_key)

  msg := []byte(req.Headers.XSignatureTimestamp + req.Body)
  sig, _ := hex.DecodeString(req.Headers.XSignatureEd25519)

  if !ed25519.Verify(verifyKey, msg, sig) {
    t.Fatal()
  }

  if ed25519.Verify(verifyKey, msg[1:], sig) {
    t.Fatal()
  }
}

