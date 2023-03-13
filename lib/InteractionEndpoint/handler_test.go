package main

import (
  "testing"
  "fmt"
  "os"

  "encoding/hex"
  "crypto/ed25519"
)

func TestMain(m *testing.M){
  fmt.Println("START")
  status := m.Run()

  os.Exit(status)
} 

func TestValidateSign(t *testing.T) {
  const (
    private_key = "97d0064c806b4c29957bd3a5e53f1299490609876f2c55bae105dff2245c9f1f"
    public_key = "2a64ff64c5e9ce58bf38faf13cc6153699717b7d88713087758a9688f06ef471"
    timestamp = "1646696920"
    message = "Hello World"
    signature ="e2815eedc16cfd9edf9f97b7721238e7e5349c253d9f8a849ef330666c99516d8389e4bb171c85e840c2cb1d79f21946734127b6f6faf618fc83dbf78b3f4105"
  )

  // keyをbyte[]にする
  verifyKey, _ := hex.DecodeString(public_key)

  msg := []byte(timestamp + message)

  sig, _ := hex.DecodeString(signature)

  b := ed25519.Verify(verifyKey, msg, sig)

  fmt.Println(b)



  t.Cleanup(func() {fmt.Println("END TesetValidateSign")})

}


