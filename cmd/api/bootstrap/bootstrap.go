package bootstrap

import (
	"gopkg.in/yaml.v3"
	"log"
	"os"
)

type config struct {
	// Spotify settings
	SpotifyToken string `yaml:"spotify-token"`
}

var cfg config

func Run() error {
	// Load config
	err := getConf()
	if err != nil {
		return err
	}

	log.Print(cfg)

	return nil
}

func getConf() error {
	yamlFile, err := os.ReadFile("config.yml")
	if err != nil {
		return err
	}

	err = yaml.Unmarshal(yamlFile, &cfg)
	if err != nil {
		return err
	}

	return nil
}
