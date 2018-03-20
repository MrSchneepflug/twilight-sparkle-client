class Pathname {
  constructor(pathname) {
    this.pathname = pathname;
  }

  matchesLoadingScreen() {
    return this.pathname === "/";
  }

  matchesTeamSelection() {
    return this.pathname === "/teams";
  }

  matchesDeveloperSelection() {
    return /^\/teams\/\w+\/developers$/.test(this.pathname);
  }

  matchesEstimationSelection() {
    return /^\/teams\/\w+\/developers\/\w+\/estimation$/.test(this.pathname);
  }

  extractTeam() {
    const matchResult = this.pathname.match(/^\/teams\/(\w+)/);

    if (matchResult === null) {
      throw new Error("Could not extract team from URI");
    }

    return matchResult[1];
  }

  extractDeveloper() {
    const matchResult = this.pathname.match(/^\/teams\/\w+\/developers\/(\w+)/);

    if (matchResult === null) {
      throw new Error("Could not extract developer from pathname");
    }

    return matchResult[1];

  }
}

export default Pathname;
