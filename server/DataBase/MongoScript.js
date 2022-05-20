
db.createUser(
    {
      user: "bits",
      pwd: "",
      roles: [ "userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
    }
  )