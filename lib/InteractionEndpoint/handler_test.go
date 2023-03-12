package main

import (
  "testing"
  "fmt"
  "os"
)

func TestMain(m *testing.M){
  fmt.Println("START")
  status := m.Run()

  os.Exit(status)
} 

func TestValidateSign(t *testing.T) {

  t.Cleanup(func() {fmt.Println("END TesetValidateSign")})

}
func TestValidateSign2(t *testing.T) {

  t.Cleanup(func() {fmt.Println("END TesetValidateSign2")})

}
