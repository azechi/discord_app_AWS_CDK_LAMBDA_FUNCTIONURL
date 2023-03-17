package main

import (
  "context"
  "github.com/aws/aws-lambda-go/lambda"

  "fmt"
  "encoding/json"
  "crypto/ed25519"
  "encoding/hex"
  "os"
  "strconv"
  "log"
)

type Request struct {
  Headers struct {
    XSignatureEd25519 string `json:"X-Signature-Ed25519"`
    XSignatureTimestamp string `json:"X-Signature-Timestamp"`
  }
  Body string
}

var verifyKey ed25519.PublicKey

func init() {
  var err any
  verifyKey, err = hex.DecodeString(os.Getenv("verifyKey"))
  if err != nil {
    panic(err)
  }
}

func main() {
  lambda.Start(func (ctx context.Context, req Request)(string, error){

    body, err := strconv.Unquote(req.Body)
    log.Print(body)
    if err != nil {
      panic(err)
    }

    msg := append([]byte(req.Headers.XSignatureTimestamp), []byte(body)...)
    sig, err := hex.DecodeString(req.Headers.XSignatureEd25519)
    if err != nil {
      panic(err)
    }

    verify := ed25519.Verify(verifyKey, msg, sig)
    log.Printf("verify=%v", verify)
    if !verify {
      return fmt.Sprint(`{"statusCode":401, "body": "invalid request signature"}`), nil 
    }

    var interaction struct {
      Type int
    }

    err = json.Unmarshal([]byte(body), &interaction)
    log.Printf("%+v", interaction)
    if err != nil {
      panic(err)
    }

    if interaction.Type == 1 {
      return fmt.Sprint(`{"type":1}`), nil
    }

    panic(err)

  })
}



