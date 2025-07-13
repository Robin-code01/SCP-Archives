$("#terminal").terminal({
  scp : {
    ACCESS : function(value) {
      window.open("/"+value, _blank)
    }
  }
}, {
    prompt: "[[;white;]>>> ]",
  })
