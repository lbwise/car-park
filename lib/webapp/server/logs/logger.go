package logs

import (
	"log"
	"os"
	"github.com/gin-gonic/gin"
)

type logger struct {
	logs *log.Logger
}

func (lg *logger) LogMiddleware(c *gin.Context) {
	lg.logs.Printf("%s request at %s from %s", c.Request.Method, c.Request.URL, c.Request.RemoteAddr)
} 

func (lg *logger) Log(msg string) {
	lg.logs.Println(msg)
}

func (lg *logger) Fatal(err error) {
	lg.logs.Fatal(err)
}

func NewLogger() *logger {
	return &logger{
		logs: log.New(os.Stdout, "webapp logs: ", log.LstdFlags),
	}
}