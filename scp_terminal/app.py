from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from helper import login_required, apology

app = Flask(__name__)
app.debug = True

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQL("sqlite:///users.db")
scp_db = SQL("sqlite:///scp.db")


@app.route("/")
@login_required
def index():
    # conn = sqlite3.connect("scp.db")
    return render_template("terminal.html")


@app.route("/scp/<scp_id>")
@login_required
def scp_page(scp_id):
    scp = scp_db.execute("SELECT * FROM scp_entries WHERE id = ?", scp_id)

    if scp_id:
        return render_template("scp.html", scp=scp[0])
    else:
        return apology("please enter a valid article")


@app.route("/scp<bob>")
@login_required
def redir(bob):
    return redirect(f"/scp/SCP{bob}")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get(
                "username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        # Ensure username was submitted
        if not username:
            return apology("must provide username", 400)

        # Ensure password was submitted
        elif not password:
            return apology("must provide password", 400)

        # Ensure confirmation was submitted
        elif not confirmation:
            return apology("must type confirmation", 400)

        # Ensure password and confirmation are same
        elif password != confirmation:
            return apology("password and confirmation are not the same", 400)

        rows = db.execute("SELECT * FROM users WHERE username = ?", username)

        # Ensures the username is unique
        if len(rows) != 0:
            return apology("username already in use", 400)

        db.execute("INSERT INTO users (username, hash) VALUES (?, ?)",
                   username, generate_password_hash(password))
        return redirect("/")

    else:
        return render_template("register.html")
