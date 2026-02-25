export interface UniversityEntry {
  name: string;
  logo: string;
}

export const TOP_UNIVERSITIES: UniversityEntry[] = [
  // ── United States ──
  { name: "Massachusetts Institute of Technology (MIT)", logo: "https://logo.clearbit.com/mit.edu" },
  { name: "Stanford University", logo: "https://logo.clearbit.com/stanford.edu" },
  { name: "Harvard University", logo: "https://logo.clearbit.com/harvard.edu" },
  { name: "California Institute of Technology (Caltech)", logo: "https://logo.clearbit.com/caltech.edu" },
  { name: "University of Chicago", logo: "https://logo.clearbit.com/uchicago.edu" },
  { name: "Princeton University", logo: "https://logo.clearbit.com/princeton.edu" },
  { name: "Yale University", logo: "https://logo.clearbit.com/yale.edu" },
  { name: "Columbia University", logo: "https://logo.clearbit.com/columbia.edu" },
  { name: "University of Pennsylvania", logo: "https://logo.clearbit.com/upenn.edu" },
  { name: "Cornell University", logo: "https://logo.clearbit.com/cornell.edu" },
  { name: "Duke University", logo: "https://logo.clearbit.com/duke.edu" },
  { name: "Johns Hopkins University", logo: "https://logo.clearbit.com/jhu.edu" },
  { name: "Northwestern University", logo: "https://logo.clearbit.com/northwestern.edu" },
  { name: "University of California, Berkeley", logo: "https://logo.clearbit.com/berkeley.edu" },
  { name: "University of California, Los Angeles (UCLA)", logo: "https://logo.clearbit.com/ucla.edu" },
  { name: "University of Michigan", logo: "https://logo.clearbit.com/umich.edu" },
  { name: "Carnegie Mellon University", logo: "https://logo.clearbit.com/cmu.edu" },
  { name: "Georgia Institute of Technology", logo: "https://logo.clearbit.com/gatech.edu" },
  { name: "University of Texas at Austin", logo: "https://logo.clearbit.com/utexas.edu" },
  { name: "University of Illinois Urbana-Champaign", logo: "https://logo.clearbit.com/illinois.edu" },
  { name: "University of Washington", logo: "https://logo.clearbit.com/uw.edu" },
  { name: "New York University (NYU)", logo: "https://logo.clearbit.com/nyu.edu" },
  { name: "University of Southern California", logo: "https://logo.clearbit.com/usc.edu" },
  { name: "Brown University", logo: "https://logo.clearbit.com/brown.edu" },
  { name: "Rice University", logo: "https://logo.clearbit.com/rice.edu" },
  { name: "Dartmouth College", logo: "https://logo.clearbit.com/dartmouth.edu" },
  { name: "Vanderbilt University", logo: "https://logo.clearbit.com/vanderbilt.edu" },
  { name: "University of Wisconsin-Madison", logo: "https://logo.clearbit.com/wisc.edu" },
  { name: "Purdue University", logo: "https://logo.clearbit.com/purdue.edu" },
  { name: "University of Maryland", logo: "https://logo.clearbit.com/umd.edu" },

  // ── United Kingdom ──
  { name: "University of Oxford", logo: "https://logo.clearbit.com/ox.ac.uk" },
  { name: "University of Cambridge", logo: "https://logo.clearbit.com/cam.ac.uk" },
  { name: "Imperial College London", logo: "https://logo.clearbit.com/imperial.ac.uk" },
  { name: "University College London (UCL)", logo: "https://logo.clearbit.com/ucl.ac.uk" },
  { name: "London School of Economics (LSE)", logo: "https://logo.clearbit.com/lse.ac.uk" },
  { name: "University of Edinburgh", logo: "https://logo.clearbit.com/ed.ac.uk" },

  // ── Canada ──
  { name: "University of Toronto", logo: "https://logo.clearbit.com/utoronto.ca" },
  { name: "University of British Columbia", logo: "https://logo.clearbit.com/ubc.ca" },
  { name: "McGill University", logo: "https://logo.clearbit.com/mcgill.ca" },
  { name: "University of Waterloo", logo: "https://logo.clearbit.com/uwaterloo.ca" },

  // ── Europe ──
  { name: "ETH Zurich", logo: "https://logo.clearbit.com/ethz.ch" },
  { name: "EPFL", logo: "https://logo.clearbit.com/epfl.ch" },
  { name: "Technical University of Munich", logo: "https://logo.clearbit.com/tum.de" },
  { name: "Sorbonne University", logo: "https://logo.clearbit.com/sorbonne-universite.fr" },
  { name: "Delft University of Technology", logo: "https://logo.clearbit.com/tudelft.nl" },
  { name: "KU Leuven", logo: "https://logo.clearbit.com/kuleuven.be" },

  // ── Asia ──
  { name: "National University of Singapore (NUS)", logo: "https://logo.clearbit.com/nus.edu.sg" },
  { name: "Nanyang Technological University (NTU)", logo: "https://logo.clearbit.com/ntu.edu.sg" },
  { name: "Tsinghua University", logo: "https://logo.clearbit.com/tsinghua.edu.cn" },
  { name: "Peking University", logo: "https://logo.clearbit.com/pku.edu.cn" },
  { name: "University of Tokyo", logo: "https://logo.clearbit.com/u-tokyo.ac.jp" },
  { name: "Seoul National University", logo: "https://logo.clearbit.com/snu.ac.kr" },
  { name: "KAIST", logo: "https://logo.clearbit.com/kaist.ac.kr" },
  { name: "Indian Institute of Technology Bombay (IIT Bombay)", logo: "https://logo.clearbit.com/iitb.ac.in" },
  { name: "Indian Institute of Technology Delhi (IIT Delhi)", logo: "https://logo.clearbit.com/iitd.ac.in" },
  { name: "Hong Kong University of Science and Technology (HKUST)", logo: "https://logo.clearbit.com/hkust.edu.hk" },

  // ── Australia ──
  { name: "University of Melbourne", logo: "https://logo.clearbit.com/unimelb.edu.au" },
  { name: "University of Sydney", logo: "https://logo.clearbit.com/sydney.edu.au" },
  { name: "Australian National University", logo: "https://logo.clearbit.com/anu.edu.au" },

  // ── Middle East ──
  { name: "Technion – Israel Institute of Technology", logo: "https://logo.clearbit.com/technion.ac.il" },
];

export function findUniversity(name: string): UniversityEntry | undefined {
  return TOP_UNIVERSITIES.find(
    (u) => u.name.toLowerCase() === name.toLowerCase()
  );
}
