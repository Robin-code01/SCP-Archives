$("#terminal").terminal(
  {
    ACCESS: function(value) {
      if (value) {
        window.open(`/scp/${value}`, "_blank");
        this.echo(`Opening ${value} in a new tab`);
      } else {
        this.echo("Usage ACCESS <SCP-###>");
      }
    },
    access: function(value) {
      if (value) {
        const safeValue = encodeURIComponent(value);
        window.open(`/scp/${safeValue}`, "_blank");
        this.echo(`Opening ${value} in a new tab`);
      } else {
        this.echo("Usage ACCESS <SCP-###>");
      }
    },
    logout: function() {
      window.open("/logout")
    }
  },
  {
    prompt: "[[;white;]>>> ]",
    greetings: greetings.innerHTML,
  },
);
