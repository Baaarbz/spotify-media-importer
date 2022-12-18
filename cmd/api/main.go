package main

import (
	"barbz.dev/spotify-transfer/cmd/api/bootstrap"
	"log"
)

func main() {

	if err := bootstrap.Run(); err != nil {
		log.Fatal(err)
	}

}
