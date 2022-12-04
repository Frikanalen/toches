import { format } from "date-fns"
import { Middleware } from "koa"

export const getXMLTVHomePage: Middleware = async (context, next) => {
  const dateStr = format(new Date(), "yyyy/MM/dd")
  context.type = "text/html"
  context.body = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <title>Schedule as XMLTV</title>
  <style>
    p, a, h1, h2, blockquote, div {
      font-family: monospace;
    }
    h1, h2 {
      text-decoration: underline;
    }
    h2 {
      padding: 1rem 0 1rem 1rem;
    }
    p {
      padding-left: 2rem;
    }
    a {
      color: #22ffff;
    }
    blockquote {
      padding: 1rem;
      background-color: #001100;
      width: fit-content;
    }
    body, html {
      min-height: 100vh;
      margin: 0;
    }
    body {
      background-color: black;
      color: #00ff00;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
    article {
      background-color: #000300;
      padding: 3rem;
      border: 1px solid #00ff00;
    }
    header, main {
      max-width: 800px;
      margin: 0 auto;
    }
    .lastUpdated {
      color: #000000;
    }
  </style>
  </head>
  <body>
  <article>
  <header>
  <h1>Schedule as XMLTV</h1>
  </header>
  <main>
  <div>
    This service provides the Frikanalen broadcast schedule in <a href="http://www.xmltv.org/">XMLTV format</a>.
  </div>
  <h2>One-day lookup</h2>
  <p>
    To obtain the schedule for a particular date, GET <code>/xmltv/YYYY/MM/DD</code>.
  </p>
  <p>For example this is the URL of today:</p>
  <p>
    <blockquote>
      GET <a href="./${dateStr}">https://frikanalen.no/xmltv/${dateStr}</a>
    </blockquote>
  </p>
  <h2>Upcoming week</h2>
  <p>
    To obtain a schedule for the upcoming week:
  </p>
  <p>
    <blockquote>
      GET <a href="./upcoming">https://frikanalen.no/xmltv/upcoming</a>
    </blockquote>
  </p>
  <p>
    It will return the schedule from today 00:00 Oslo time, and 7 days hence.
  </p>
  <h2>Issues</h2>
  <p>
    Please contact the <a href="mailto:toresbe@protonmail.com">chief engineer</a>.
  </p>
  <h2>TVAnytime</h2>
  <p>We will start migration to TVAnytime soon. Check out <a href="../tva">our TVAnytime service</a>.</p>
  </main>
  <div class="lastUpdated">Last updated 2022-12-04</div>
  </article>
  </body>
  </html>`
  context.status = 200

  return next()
}
