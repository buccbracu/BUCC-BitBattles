"use client";

import React from "react";
import "./page.css";

export default function RulesPage() {
  return (
    <div className="rules-page">
      <div className="container">
        <div className="rules-content">
          <h1>BUCC Bit Battles: Official Rule Book</h1>
          <p className="rules-meta">
            <strong>Final Version:</strong> 03 July 2025
            <br />
            <strong>Organized by:</strong> BRAC University Computer Club (BUCC)
            <br />
            <strong>Powered by:</strong> Phitron
            <br />
            <strong>Supported by:</strong> Department of Computer Science and
            Engineering (CSE), BRAC University
          </p>

          <section className="rule-section">
            <h2>1. Introduction</h2>
            <p>
              BUCC Bit Battles is a multi-tiered intra-university competitive
              programming contest designed for the students of BRAC University. This
              event follows a hybrid format, beginning with an online preliminary
              round and culminating in an onsite final round. The contest draws
              inspiration from ICPC practices and aims to foster teamwork,
              algorithmic thinking, and problem-solving excellence among BRACU
              students.
            </p>
          </section>

          <section className="rule-section">
            <h2>2. Mission</h2>
            <p>
              The mission of BUCC Bit Battles is to create a platform for students
              to test and demonstrate their programming capabilities in a
              structured, competitive, and team-based environment. The contest
              promotes collaboration, fair play, and technical excellence, nurturing
              future problem solvers and competitive programmers within the
              university.
            </p>
          </section>

          <section className="rule-section">
            <h2>3. Structure of the Contest</h2>

            <div className="rule-subsection">
              <h3>3.1 Preliminary Round (Online)</h3>
              <ul>
                <li>
                  <strong>Date:</strong> 11 July 2025
                </li>
                <li>
                  <strong>Mode:</strong> Online
                </li>
                <li>
                  <strong>Problems:</strong> 4–6
                </li>
                <li>
                  <strong>Duration:</strong> 1 Hours
                </li>
                <li>
                  <strong>Purpose:</strong> Ranking and selection of top-performing
                  teams
                </li>
                <li>
                  <strong>Advancement:</strong> Top 100 teams will be selected for
                  the onsite Final Round
                </li>
              </ul>
            </div>

            <div className="rule-subsection">
              <h3>3.2 Final Round (Onsite)</h3>
              <ul>
                <li>
                  <strong>Date:</strong> 18 July 2025
                </li>
                <li>
                  <strong>Venue:</strong> BRAC University Campus
                </li>
                <li>
                  <strong>Mode:</strong> Onsite
                </li>
                <li>
                  <strong>Problems:</strong> 6–10
                </li>
                <li>
                  <strong>Duration:</strong> 4 hours
                </li>
                <li>
                  <strong>Environment:</strong> All teams will compete on machines
                  provided by the organizers with a uniform computing environment.
                </li>
              </ul>
            </div>
          </section>

          <section className="rule-section">
            <h2>4. Eligibility Criteria</h2>
            <ul>
              <li>
                All participants must be currently enrolled undergraduate students
                of BRAC University.
              </li>
              <li>Each team must consist of 1 to 3 members.</li>
              <li>A student may participate in only one team.</li>
              <li>
                Team composition must be fixed once the preliminary round begins; no
                substitutions allowed afterward.
              </li>
              <li>
                A designated team leader must act as the official point of contact.
              </li>
              <li>
                Any contestant who has ranked above 60% in any university-level
                national programming competition will not be eligible to participate
                in this contest.
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>5. Registration & Confirmation</h2>
            <ul>
              <li>Teams must register before the specified deadline.</li>
              <li>
                <strong>Registration Deadline:</strong> 9 July 2025
              </li>
              <li>
                <strong>Registration Fee:</strong>
                <ul>
                  <li>Preliminary Round: BDT 498/=(Per Team)</li>
                  <li>Final Round (for qualified teams): BDT 1000/=(Per Team)</li>
                </ul>
              </li>
              <li>
                Registrations must include full names, student IDs, valid BRACU
                email addresses, and academic batch details.
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>6. Programming Environment</h2>
            <ul>
              <li>
                <strong>Languages Supported:</strong> C, C++, Java, Python (subject
                to platform capabilities)
              </li>
              <li>
                Each team will be provided with a single computer. The contest
                system and environment details (IDE/editor, OS, compilers, etc.)
                will be shared in advance.
              </li>
              <li>
                Participants will not be allowed to use any personal electronic
                devices.
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>7. Contest Rules</h2>
            <ul>
              <li>
                <strong>Fair Play:</strong> All participants are expected to uphold
                integrity and good sportsmanship.
              </li>
              <li>
                <strong>Plagiarism or Code Sharing:</strong> Zero tolerance. Teams
                found guilty will be disqualified immediately.
              </li>
              <li>
                <strong>AI Tools:</strong> Use of AI-based code generators (e.g.,
                ChatGPT, Copilot) is strictly prohibited.
              </li>
              <li>
                <strong>External Help:</strong> Contestants may not use online
                forums or seek help from others outside their team.
              </li>
              <li>
                Each team may bring a printed code template of up to 25 pages.
                Templates may be handwritten or typed. No digital, electronic, or
                internet-enabled materials are allowed during the contest.
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>8. Conduct and Disqualification</h2>
            <p>Teams or individuals may be disqualified for:</p>
            <ul>
              <li>
                Submitting identical code as another team or as found on any
                internet platform
              </li>
              <li>Attempting to disrupt contest infrastructure</li>
              <li>Unauthorized communication with outsiders</li>
              <li>Use of prohibited resources or software</li>
              <li>Inappropriate behavior</li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>9. Clarifications and Technical Support</h2>
            <ul>
              <li>
                Teams may submit clarification requests through the contest
                platform.
              </li>
              <li>
                Organizers may release public clarifications when applicable.
              </li>
              <li>
                For technical issues, a designated help desk will be available
                during both rounds.
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>10. Awards & Recognition</h2>
            <ul>
              <li>Champion Team</li>
              <li>1st Runner-up</li>
              <li>2nd Runner-up</li>
              <li>Honorable Mention(s)</li>
              <li>First team to solve each problem will get a prize</li>
              <li>
                All participants in the final round will receive digital
                participation certificates.
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>11. Contact & Support</h2>
            <p>For further inquiries or assistance:</p>
            <ul>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:bucc@g.bracu.ac.bd">bucc@g.bracu.ac.bd</a>
              </li>
              <li>
                <strong>Discord Server:</strong>{" "}
                <a
                  href="https://discord.gg/Jxc7p8esCK"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://discord.gg/Jxc7p8esCK
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +880 1756-020067 (President - Istiak Zaman
                Shuvo)
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>12. Code of Conduct</h2>
            <p>All participants must:</p>
            <ul>
              <li>Show respect to organizers, volunteers, and fellow teams</li>
              <li>Follow all instructions and venue guidelines</li>
              <li>Wear university ID cards during onsite participation</li>
              <li>
                Refrain from any action that may cause disturbance or unfair
                advantage
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>13. Judge Panel</h2>
            <ul>
              <li>
                Faculty members of Computer Science and Engineering, BRAC
                University.
              </li>
              <li>Instructors of Phitron.</li>
              <li>
                Senior programming contestants (current and alumni) of BRAC
                University.
              </li>
            </ul>
          </section>

          <section className="rule-section">
            <h2>14. Final Notes</h2>
            <ul>
              <li>
                The organizing committee reserves the right to amend or update
                these rules if necessary.
              </li>
              <li>
                The decision of the judge panel will be considered as the final and
                irreversible decision regarding the contest result.
              </li>
              <li>
                Any such changes will be communicated in advance via official
                channels.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
