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

  matchesDashboard() {
    return this.pathname === "/dashboard";
  }

  matchesEstimations() {
    return this.pathname === "/estimations";
  }

  matchesArena() {
    return this.pathname === "/arena";
  }

  matchesDeveloperSelection() {
    return /^\/teams\/\w+\/developers$/.test(this.pathname);
  }

  matchesEstimationSelection() {
    return /^\/teams\/\w+\/developers\/\w+\/estimation$/.test(this.pathname);
  }

  extractTeam() {
    return this.extract(/^\/teams\/(\w+)/);
  }

  extractDeveloper() {
    return this.extract(/^\/teams\/\w+\/developers\/(\w+)/);
  }

  extract(pattern) {
    const matchResult = this.pathname.match(pattern);

    if (matchResult === null) {
      throw new Error(`Could not extract pattern ${pattern.toString()} from pathname`);
    }

    return matchResult[1];
  }
}

export default Pathname;
