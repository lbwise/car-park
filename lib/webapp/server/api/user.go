package api

import (
	"github.com/gin-gonic/gin"
	"fmt"
)

var profiles []Profile = []Profile{}

// Add requirements for string
type Email string

type Profile struct {
	Id int `json: "id"` 
	Name string `json: "name"`
	Email Email `json: "email"`
	History []Booking `json: "history"`
}

func getProfile(c *gin.Context) {
	// db query profile
	profileStruct := &Profile{Name: "Liam", Email: "liam@wise"}
	c.JSON(200, profileStruct)
}


func getHistory(c *gin.Context) {
	// db query profile
	profileStruct := Profile{Name: "Liam", Email: "liam@wise"}
	profiles = append(profiles, profileStruct)
	c.JSON(200, profileStruct.History)
}


func updateProfile(c *gin.Context) {
	user := Profile{}
	c.BindJSON(&user)
	fmt.Println(user)
	profiles[user.Id] = user
}

func addUserRoutes(api *gin.RouterGroup) {
	router := api.Group("/profile")
	router.GET("", getProfile)
	router.PUT("", updateProfile)
	router.GET("/history", getHistory)
}

