package api

import (
	"io"
	"github.com/gin-gonic/gin"
	"fmt"
)

func homeRoute(c *gin.Context) {
	io.WriteString(c.Writer, "THIS IS HOME")
}


func APIRouter(api *gin.RouterGroup) {
	api.GET("/", homeRoute)
	addUserRoutes(api)
	addLotRoutes(api)
	addBookRoutes(api)
}