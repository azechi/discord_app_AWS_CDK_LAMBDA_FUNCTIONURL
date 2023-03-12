package main

import (
  "context"
  "github.com/aws/aws-lambda-go/lambda"

  "fmt"
)

type MyEvent struct {
  Name string `json:"name"`
}

func main() {
  lambda.Start(func (ctx context.Context, name MyEvent)(string, error){
    return fmt.Sprintf("Hello %s!", name.Name), nil
  })
}
