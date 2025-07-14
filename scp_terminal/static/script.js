const commands = ["list", "search", "classes", "ACCESS", "help"];
const cmdRegex = new RegExp(`^(${commands.join("|")})`);

$("#terminal").terminal({
    ACCESS: function(value) {
        value = value.toUpperCase()
        $.ajax({
            url: "/api/command",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ command: "access", value: value }),
            success: (data) => {
                const safeValue = encodeURIComponent(value);
                window.open(`/scp/${safeValue.toUpperCase()}`, "_blank");
                this.echo(`Opening ${value} in a new tab`);
            },
            error: (xhr, status, error) => {
                console.error("Error:", error);
                this.echo(`Error: ${error}`);
            },
        })
    },
    access: function(value) {
        value = value.toUpperCase()
        $.ajax({
            url: "/api/command",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ command: "access", value: value }),
            success: (data) => {
                const safeValue = encodeURIComponent(value);
                window.open(`/scp/${safeValue.toUpperCase()}`, "_blank");
                this.echo(`Opening ${value} in a new tab`);
            },
            error: (xhr, status, error) => {
                console.error("Error:", error);
                this.echo(`Error: ${error}`);
            },
        })
    },
    classes: function() {
        this.echo("[[b;#00ff00;]There are several commonly used SCP Object Classes:]");
        this.echo("");
        this.echo("[[b;#ffffff;]Canonical Classes:]");
        this.echo("  [[;#ffff00;]Safe]        - Easily contained; requires minimal resources.");
        this.echo("  [[;#ffff00;]Euclid]      - Unpredictable behavior; needs special containment.");
        this.echo("  [[;#ffff00;]Keter]       - Difficult to contain; active threat potential.");
        this.echo("  [[;#ffff00;]Thaumiel]    - Used by the Foundation to contain other SCPs.");
        this.echo("  [[;#ffff00;]Apollyon]    - Cannot be contained; world-ending scenario.");
        this.echo("  [[;#ffff00;]Archon]      - Can be contained but intentionally left uncontained.");
        this.echo("  [[;#ffff00;]Ticonderoga] - Experimental or provisional classification.");
        this.echo("  [[;#ffff00;]Explained]   - No longer anomalous; science explains it now.");
        this.echo("  [[;#ffff00;]Neutralized] - Destroyed or rendered inert.");
        this.echo("  [[;#ffff00;]Decommissioned] - Removed from SCP list; too dangerous or mundane.");
        this.echo("  [[;#ffff00;]Pending]     - Not yet assigned a proper class.");
        this.echo("  [[;#ffff00;]Uncontained] - Not currently in Foundation control.");
        this.echo("");

        this.echo("[[b;#ffffff;]Esoteric / One-off Classes:]");
        this.echo("  [[;#ff69b4;]Anatta]        - Threatens existence itself (nihilistic anomaly).");
        this.echo("  [[;#ff69b4;]Hiemal]        - Cold-related anomaly; metaphysical frostbite.");
        this.echo("  [[;#ff69b4;]Zeno]          - Behaves paradoxically like Zeno’s paradox.");
        this.echo("  [[;#ff69b4;]Keneq]         - Anomaly which changes in nature upon observation.");
        this.echo("  [[;#ff69b4;]Appolyon (one-off)] - Alternate spelling found in some SCPs.");
        this.echo("  [[;#ff69b4;]Azathoth]      - Too chaotic to classify; cosmic horror level.");
        this.echo("  [[;#ff69b4;]Hiatus]        - Placeholder; object temporarily unclassified.");
        this.echo("  [[;#ff69b4;]Ovis Aries]    - Self-replicating anomaly (sheep reference).");
        this.echo("  [[;#ff69b4;]Undercover]    - Hidden within another SCP or identity.");
        this.echo("  [[;#ff69b4;]Impetus]       - SCP acts as a force to trigger events.");
        this.echo("  [[;#ff69b4;]Dependent]     - SCP requires external factor to manifest.");
        this.echo("  [[;#ff69b4;]Classified]    - Classification intentionally withheld.");
        this.echo("");

        this.echo("Use [[b;#00ffff;]list all] to view all SCP IDs.");
    },

    help: function() {
        this.echo("[[b;#00ff00;]Available Commands:]");
        this.echo("");

        this.echo("[[b;#ffffff;]ACCESS <SCP-###>]");
        this.echo("  [[;#aaaaaa;]Opens the SCP article in a new tab if it exists.]");
        this.echo("");

        this.echo("[[b;#ffffff;]list <all|classification>]");
        this.echo("  [[;#aaaaaa;]Lists all SCPs or those of a specific Object Class.]");
        this.echo("  [[;#aaaaaa;]Example: list Safe]");
        this.echo("");

        this.echo("[[b;#ffffff;]search <keyword>]");
        this.echo("  [[;#aaaaaa;]Searches for SCP articles containing the keyword.]");
        this.echo("  [[;#aaaaaa;]Example: search humanoid]");
        this.echo("");

        this.echo("[[b;#ffffff;]classes]");
        this.echo("  [[;#aaaaaa;]Displays all known SCP Object Classes with descriptions.]");
        this.echo("");

        this.echo("[[b;#ffffff;]logout]");
        this.echo("  [[;#aaaaaa;]Logs you out and returns to the login screen.]");
        this.echo("");

        this.echo("[[b;#00ffff;]Tip:] [[;#aaaaaa;]Type commands carefully. Unknown commands will be rejected.]");
        this.echo("[[b;#ff0000;]Note:] [[;#aaaaaa;]You must be logged in to execute any command.]");
    },


    list: function(value) {
        $.ajax({
            url: "/api/command",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ command: "list", value: value }),
            success: (data) => {
                if (data.list && data.list.length) {
                    this.echo(`SCPs found: ${data.list.join(", ")}`);
                } else {
                    this.echo("No SCPs found.");
                }
            },
            error: (xhr, status, error) => {
                console.error("Error:", error);
                this.echo(`Error: ${error}`);
            },
        });
    },
    search: function(value) {
        $.ajax({
            url: "/api/command",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ command: "search", value: value }),
            success: (data) => {
                if (data.list && data.list.length) {
                    this.echo(`SCPs found: ${data.list.join(", ")}`);
                } else {
                    this.echo("No SCPs found.");
                }
            },
            error: (xhr, status, error) => {
                console.error("Error:", error);
                this.echo(`Error: ${error}`);
            },
        });
    },
    logout: function() {
        window.open("/logout");
    },
}, {
    prompt: function(callback) {
        const prompts = [
            "[[b;#ff0000;][SCP-███]] [[b;#00ff00;]>>> ]",
            "[[b;#ffff00;][CLEARANCE LEVEL-1]] [[b;#00ff00;]>>> ]",
            "[[b;#ffff00;][CLEARANCE LEVEL-2]] [[b;#00ff00;]>>> ]",
            "[[b;#ffff00;][CLEARANCE LEVEL-3]] [[b;#00ff00;]>>> ]",
            "[[b;#ffff00;][CLEARANCE LEVEL-4]] [[b;#00ff00;]>>> ]",
            "[[b;#ffff00;][CLEARANCE LEVEL-5]] [[b;#00ff00;]>>> ]",
            "[[b;#00ffff;][ACCESS GRANTED]] [[b;#00ff00;]>>> ]",
            "[[b;#ff69b4;][ACCESS DENIED]] [[b;#00ff00;]>>> ]",
            "[[b;#ff4500;][PROJECT: THAUMIEL]] [[b;#00ff00;]>>> ]",
            "[[b;#ff4500;][PROJECT: ARCHON]] [[b;#00ff00;]>>> ]",
            "[[b;#ff4500;][PROJECT: APOLLYON]] [[b;#00ff00;]>>> ]",
            "[[b;#7cfc00;][TERMINAL-ALPHA]] [[b;#00ff00;]>>> ]",
            "[[b;#7cfc00;][TERMINAL-BETA]] [[b;#00ff00;]>>> ]",
            "[[b;#7cfc00;][TERMINAL-GAMMA]] [[b;#00ff00;]>>> ]",
            "[[b;#ff00ff;][NODE-█REDACTED█]] [[b;#00ff00;]>>> ]",
            "[[b;#00ced1;][ARCHIVE-01]] [[b;#00ff00;]>>> ]",
            "[[b;#00ced1;][ARCHIVE-02]] [[b;#00ff00;]>>> ]",
            "[[b;#00ced1;][ARCHIVE-03]] [[b;#00ff00;]>>> ]",
            "[[b;#ff6347;][QUARANTINE MODE]] [[b;#00ff00;]>>> ]",
            "[[b;#ff6347;][LOCKDOWN ACTIVE]] [[b;#00ff00;]>>> ]",
            "[[b;#ff6347;][BREACH CONTAINMENT]] [[b;#00ff00;]>>> ]",
            "[[b;#ff0000;][SECURITY ALERT]] [[b;#00ff00;]>>> ]",
            "[[b;#ff0000;][ALERT: KETER ESCAPE]] [[b;#00ff00;]>>> ]",
            "[[b;#00ffff;][DATA STREAM: ONLINE]] [[b;#00ff00;]>>> ]",
            "[[b;#00ffff;][DATA STREAM: INTEGRITY: 99%]] [[b;#00ff00;]>>> ]",
            "[[b;#00ffff;][DATA STREAM: CORRUPTED]] [[b;#00ff00;]>>> ]",
            "[[b;#ff1493;][██ACCESS█POINT█]] [[b;#00ff00;]>>> ]",
            "[[b;#ff1493;][█TERMINAL█LOCK█]] [[b;#00ff00;]>>> ]",
            "[[b;#ff69b4;][██ERROR██CODE██]] [[b;#00ff00;]>>> ]",
            "[[b;#ff69b4;][██RESTRICTED██]] [[b;#00ff00;]>>> ]",
            "[[b;#ff1493;][█SCP-LINK-███]] [[b;#00ff00;]>>> ]",
            "[[b;#00ff7f;][SCP-LIVE FEED]] [[b;#00ff00;]>>> ]",
            "[[b;#00ff7f;][MONITORING SYSTEM: OK]] [[b;#00ff00;]>>> ]",
            "[[b;#00ff7f;][MONITORING SYSTEM: FAIL]] [[b;#00ff00;]>>> ]",
            "[[b;#ff8c00;][█CONNECTION█LOST█]] [[b;#00ff00;]>>> ]",
            "[[b;#ff8c00;][█CONNECTION█RE-ESTABLISHED█]] [[b;#00ff00;]>>> ]",
            "[[b;#ff6347;][█CONTAINMENT█FAILURE█]] [[b;#00ff00;]>>> ]",
            "[[b;#ffff00;][███SYSTEM███CHECK███]] [[b;#00ff00;]>>> ]",
            "[[b;#00ced1;][███UPLINK ACTIVE███]] [[b;#00ff00;]>>> ]",
            "[[b;#00ced1;][███UPLINK LOST███]] [[b;#00ff00;]>>> ]",
            "[[b;#ff69b4;][███CORRUPTED DATA███]] [[b;#00ff00;]>>> ]",
            "[[b;#ffa500;][███OVERRIDE REQUIRED███]] [[b;#00ff00;]>>> ]",
            "[[b;#00ff7f;][███SECURITY KEY ACCEPTED███]] [[b;#00ff00;]>>> ]",
            "[[b;#00ff7f;][███SECURITY KEY REJECTED███]] [[b;#00ff00;]>>> ]",
            "[[b;#8a2be2;][███FOUNDATION TERMINAL███]] [[b;#00ff00;]>>> ]",
            "[[b;#8a2be2;][███CROSS-LINK ACTIVE███]] [[b;#00ff00;]>>> ]",
            "[[b;#00fa9a;][███COGNITOHAZARD DETECTED███]] [[b;#00ff00;]>>> ]",
            "[[b;#ff0000;][███MEMETIC AGENT INJECTED███]] [[b;#00ff00;]>>> ]",
            "[[b;#ff4500;][███PHYSICAL BREACH ALERT███]] [[b;#00ff00;]>>> ]",
            "[[b;#7fffd4;][███INTERNAL LOG ACTIVE███]] [[b;#00ff00;]>>> ]",
            "[[b;#00ffff;][███ANALYSIS NODE ONLINE███]] [[b;#00ff00;]>>> ]"
        ];

        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        callback(randomPrompt);
    },
    greetings: greetings.innerHTML,
    keymap: {
        "TAB": function() {
            this.insert("\t");
        }
    },
    completion: true,
    keydown: function(e, term) {
        setTimeout(() => {
            const input = term.before_cursor() + term.after_cursor();
            const highlighted = input
                .replace(cmdRegex, '[[b;#00ff00;]$1]') // green for valid commands
                .replace(/"[^"]*"/g, '[[;#ffff00;]$&]') // yellow for strings
                .replace(/\b\d+\b/g, '[[;#00ffff;]$&]'); // cyan for numbers

            term.set_command(highlighted);
        }, 0);

        return true; // allow typing
    },

}, );