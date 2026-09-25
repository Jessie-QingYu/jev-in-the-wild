# Jev in the wild

**Real-world use cases, open-source projects, benchmarks and criticism of [Jev](https://typesafe.ai), TypeSafe AI's System One model — what people actually build with it, and where it actually fails.**

![entries](https://img.shields.io/badge/entries-257-2f81f7) ![open source](https://img.shields.io/badge/open%20source%20projects-162-2f81f7) ![updated](https://img.shields.io/badge/updated-2026--09--25-2f81f7) ![data license](https://img.shields.io/badge/data-CC0--1.0-2f81f7)

Three things make this different from the other Jev lists:

1. **It is not only GitHub.** 142 of the 257 entries are Reddit threads, Hacker News posts, YouTube evaluations and blog write-ups — where most of the first-hand reporting actually happens.
2. **It includes the criticism.** An awesome list is promotional by construction. This one has a [section for what does not work](#where-jev-struggles), and negative results are welcome in every other section too.
3. **It is data, not prose.** [`data/entries.json`](data/entries.json) is the source of truth and this README is generated from it. Fork the data, build something better, no scraping required.

**Live companion:** [the tracker this index is built from](https://jessie.romeos.cc/full/apps/jev-tracker) — everything the daily scan has ever found, searchable and filterable, including the candidates that did not clear the bar for this list. It runs on a personal instance, so this repository, not the site, is the durable copy.

*Not affiliated with TypeSafe AI. Not exhaustive — see [how this is built](#how-this-list-is-built).*

---

## Contents

- [Numbers at a glance](#numbers-at-a-glance)
- [Ten worth opening first](#ten-worth-opening-first)
- [Where Jev struggles](#where-jev-struggles)
- [Browse by category](#browse-by-category)
  - [Classification and routing](#classification-and-routing)
  - [Extraction and scoring](#extraction-and-scoring)
  - [Guardrails and verification](#guardrails-and-verification)
  - [Agent and workflow logic](#agent-and-workflow-logic)
  - [Real-time and games](#real-time-and-games)
  - [Benchmarks and comparisons](#benchmarks-and-comparisons)
  - [Speed, pricing and access](#speed-pricing-and-access)
  - [Model and research](#model-and-research)
  - [Everything else](#everything-else)
  - [SDKs and clients](#sdks-and-clients)
  - [Editor, OS and app integrations](#editor-os-and-app-integrations)
  - [Open imitations and local models](#open-imitations-and-local-models)
- [New and unproven](#new-and-unproven)
- [How this list is built](#how-this-list-is-built)
- [Contributing](#contributing)
- [License](#license)

## Numbers at a glance

| | |
| --- | --- |
| Entries | **257** listed, 47 unproven |
| Open-source projects | 162 |
| Reported use cases | 41 |
| Analysis and criticism | 51 |
| Official from TypeSafe AI | 28 |
| Where the entries come from | GitHub 151, Reddit 78, YouTube 19, Hacker News 17, blogs and web 39 |
| Languages of the code | Python 54, TypeScript 31, JavaScript 18, Rust 9, HTML 9, Go 7 |
| Categories | 12 |
| Last refreshed | 2026-09-25 |

Signals: ★ GitHub stars · ▲ Reddit or Hacker News points · ▶ views · ♥ likes. They come from four different platforms and **are not comparable with each other** — they are a popularity reading, never a quality one.

## Ten worth opening first

Hand-picked, and picked for evidence rather than for stars: an entry is here because it reports what it measured.

1. **[Classified 261 IRS forms at 100% accuracy](https://github.com/kyotofin/tax-doc-classifier)** — The clearest measured win in the whole index: 261 IRS tax pages, 100% strict accuracy, ~$0.001 a page, 34× cheaper and 6× faster than the LLM pipeline it replaced.  
   <sub>use case · Classification and routing · ★ 448 · kyotofin/tax-doc-classifier · 2026-09-18</sub>

2. **[Trade futures every 30 seconds with Jev](https://reddit.com/r/ObsideAI/comments/1wkpsxs/i_let_jev_ai_trade_every_30_seconds_for_more_than)** — The clearest measured loss, and it belongs here for the same reason: a futures bot ran on Jev decisions for 24 hours and finished 3.15% down over ~731 simulated trades.  
   <sub>use case · Real-time and games · ▲ 25 · r/ObsideAI · 2026-09-19</sub>

3. **[macOS computer-use loop with OCR and Jev](https://github.com/awlevin/typesafe-computer-use)** — Shows the pattern most projects converge on: Jev picks the action behind a confidence gate, and a writing model is kept in reserve for the parts that need prose.  
   <sub>code · Editor, OS and app integrations · ★ 954 · awlevin/typesafe-computer-use · 2026-09-16</sub>

4. **[Open-source 421M-parameter Jev-style decision model](https://reddit.com/r/LocalLLaMA/comments/1wjieap/made_the_horizontal_opensource_model_for_jev_with)** — The open answer to “do I need the API at all” — a 421M ModernBERT encoder with a typed decision head, RLCD training, published benchmarks and a ~35 ms forward pass.  
   <sub>code · Open imitations and local models · ▲ 936 · r/LocalLLaMA · 2026-09-18</sub>

5. **[CPU-runnable 395M Jev-compatible model](https://reddit.com/r/LocalLLaMA/comments/1wkpxn6/von_opensource_395m_system_one_model)** — A second, independent take on the same question: 395M parameters, 1-2 GB of CPU memory, 25-300 ms, and a claim to beat Jev on benchmarks that nobody has replicated yet.  
   <sub>code · Open imitations and local models · ▲ 192 · r/LocalLLaMA · 2026-09-19</sub>

6. **[Codex router driven by Jev](https://github.com/0xNatoshi/jev-codex-router)** — Routing as a product rather than a demo: picks Codex's model, reasoning depth and speed mode on every single turn.  
   <sub>code · Agent and workflow logic · ★ 272 · 0xNatoshi · 2026-09-17</sub>

7. **[Hermes plugin compacts context without rewriting messages](https://reddit.com/r/hermesagent/comments/1wkpl3q/integrated_the_jev_context_engine_into_hermes)** — The most rigorous engineering in the index — context compaction with fallbacks, metrics, a shadow comparison against the old path, and a dashboard to watch it.  
   <sub>code · Agent and workflow logic · ▲ 138 · r/hermesagent · 2026-09-19</sub>

8. **[Graded harmful prompts across four benchmarks](https://reddit.com/r/singularity/comments/1wiq7vn/jev_from_typesafeai_is_getting_hyped_quite_a_bit)** — Jev as an alignment monitor, graded across four harmful-prompt benchmarks, reporting both better results and lower cost than the alternatives tested.  
   <sub>use case · Guardrails and verification · ▲ 55 · r/singularity · 2026-09-17</sub>

9. **[Fact-checks Jev’s 200x performance hype](https://youtube.com/watch?v=no9G3N8PSIk)** — Someone actually checked the headline numbers instead of repeating them, and separates the claims that hold up from the ones that do not.  
   <sub>opinion · Benchmarks and comparisons · ▶ 585 · Prism Labs · 2026-09-20</sub>

10. **[Cloudflare search relevance engine using Jev](https://github.com/superagents-lab/jev-search)** — A whole search stack — query interpretation, source selection, relevance ranking — running on typed decisions at the edge.  
   <sub>code · Classification and routing · ★ 454 · superagents-lab/jev-search · 2026-09-17</sub>

## Where Jev struggles

Every other Jev list is a highlight reel. These are the entries that report a limit, a failure, a disappointing benchmark or a claim that did not survive checking — the ones worth reading before you commit an architecture to a typed-decision model.

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Use Jev confidence to decide when to escalate](https://reddit.com/r/LLMDevs/comments/1wkwqu2/what_is_jev_typesafes_system_one_model_explained) | The author explains Jev's typed decisions, latency, pricing, and confidence signal, while noting benchmark caveats and recommending confidence-based human or larger-model escalation. | opinion | ▲ 91 | 2026-09-19 |
| [Breaks down Jev as a code-focused AI model](https://youtube.com/watch?v=2Bs0Ink_-Uo) | A video explainer examines Jev's positioning as the first AI model built specifically for code. | opinion | ▶ 369.8k | 2026-09-17 |
| [Finds classical ML stronger on most tested datasets](https://reddit.com/r/LLMDevs/comments/1wlc11f/jev_vs_classical_ml_results_from_8_classification) | Across eight classification datasets, Jev beat classical models on IMDb but generally lagged on labelled-data tasks; the author would keep trained local models. | opinion | ▲ 80 | 2026-09-20 |
| [Evaluates Jev as a classification model](https://youtube.com/watch?v=X117w2Rark8&t=114s) | A video presents an evaluation of whether Jev is an effective general-purpose classification model. | opinion | ▶ 322k | 2026-09-18 |
| [Local models outperform Jev in legal RAG](https://reddit.com/r/Rag/comments/1wm4oqg/jev_system_one_cloud_vs_local_models_distilbert) | A measured UK-legislation benchmark reports local models were much faster and cheaper for routing, reranking, and verification, while Jev falsely accepted fabricated law. | opinion | ▲ 29 | 2026-09-21 |
| [Examines whether Jev could replace LLMs](https://youtube.com/watch?v=2vYV4K1RQ1w) | A high-reach explainer comparing Jev’s role with LLMs and questioning whether typed decision models can replace them. | opinion | ▶ 122.7k | 2026-09-22 |
| [Jev improves classifiers more than it creates new AI](https://reddit.com/r/learnmachinelearning/comments/1wmhwdu/what_everyone_is_getting_wrong_about_typesafe_ais) | The author argues that Jev resembles existing classifiers and zero-shot systems, while its architecture and training may still be novel. They caution that internal details and independent benchmarks remain limited. | opinion | ▲ 17 | 2026-09-21 |
| [Explains Jev's speed and price advantage with a caveat](https://youtube.com/watch?v=qdji39XXgEY) | The video argues that Jev is fast and inexpensive while explicitly examining a limitation or trade-off. | opinion | ▶ 31.5k | 2026-09-18 |
| [Frames Jev as a smart switch, not an LLM replacement](https://reddit.com/r/indotech/comments/1witl7h/introducing_system_one_models_jev_typesafe_ai_blog) | The post explains Jev's fixed-choice limits and strengths in routing, scoring and verification, while rejecting the implication that System One framing implies AGI. | opinion | ▲ 6 | 2026-09-17 |
| [Tests whether Jev can beat transformer models](https://youtube.com/watch?v=NIlQsncfVYs) | An explainer that directly questions Jev’s advantage over transformer models and discusses the System One framing. | opinion | ▶ 16.8k | 2026-09-16 |
| [Argues for pragmatic System One models in production](https://latent.space/p/jev) | An interview-style discussion of Jev and TypeSafe AI framed around production use rather than treating System One as a general replacement for LLMs. | opinion | ▲ 4 | 2026-09-21 |
| [Questions Jev's pricing and performance claims](https://reddit.com/r/codex/comments/1whmrui/typesafe_ai_jev_is_100x_cheaper_than_lunamax_and) | The author is skeptical of TypeSafe's reported cost and speed advantages, while arguing that such economics could enable large swarms of cheap decision models if validated. | opinion | ▲ 4 | 2026-09-16 |
| [Tries TypeSafe’s Jev model hands-on](https://youtube.com/watch?v=CcmqPS6q9Gw) | A hands-on video testing Jev in practice; the title does not reveal the result or scope of the evaluation. | opinion | ▶ 12.7k | 2026-09-18 |
| [Argues for moving on from TypeSafe Jev](https://youtube.com/watch?v=dZnKGHsImxo) | A video whose title signals a negative verdict or alternative to Jev, though it provides no details about the basis of that conclusion. | opinion | ▶ 9k | 2026-09-20 |
| [Explains Jev’s System One model concept](https://unzip.dev/0x025-system-one-models) | An explainer focused on TypeSafe AI’s System One models and Jev, with enough topic specificity to merit inclusion despite limited supplied detail. | opinion | ▲ 1 | 2026-09-22 |
| [Explains Jev’s typed decisions and confidence caveats](https://reddit.com/r/ChatGPT/comments/1wkwscw/what_is_jev_typesafes_system_one_model_explained) | An infographic-based explainer highlights typed outputs, confidence-based gating, benchmark cost and latency, while noting limits in TypeSafe’s evaluations. | opinion | ▲ 1 | 2026-09-19 |
| [Benchmarks Jev-assisted web form filling against monolithic Claude](https://reddit.com/r/ClaudeWorkflows/comments/1wj7imp/workflow_benchmarking_llm_architectures_for_web) | Compares Claude planning plus Jev execution with Claude and Playwright MCP, arguing that planning costs dominate web-automation economics. | opinion | ▲ 1 | 2026-09-17 |
| [Compares Jev with Laya amid controversy](https://youtube.com/watch?v=OLgiHBlDhWU) | The video explicitly compares TypeSafe AI’s Jev with Laya and addresses the controversy around them, making a focused evaluative claim. | opinion | ▶ 7.3k | 2026-09-22 |
| [Evaluates whether Jev is worth using](https://youtube.com/watch?v=7aAq5J64K34) | A video review of TypeSafe’s RLCD Jev model that assesses its practical value, though the supplied description gives no test details. | opinion | ▶ 2.6k | 2026-09-18 |
| [Benchmark Jev against LLMs, BERT, and Laya](https://reddit.com/r/AI_India/comments/1wmvyqz/i_benchmarked_typesafes_jev_against_llms_bert_and) | Healthcare voice-AI builder compares six classifiers on SST-2, AG News, and Banking77, reporting flat Jev latency but 380ms p50 through OpenRouter and stronger high-label performance. | opinion | — | 2026-09-22 |
| [Explains Jev as a decision layer, not an LLM replacement](https://reddit.com/r/ArtificialInteligence/comments/1wl2our/spent_over_2_hours_going_through_the_jev_docs_and) | After working through the docs, the author explains Jev’s typed choices, scores and checks, and demonstrates the API through the playground, curl, Python SDK and an agent. | opinion | — | 2026-09-20 |
| [Tests Jev against Bayesian-optimal strategies](https://github.com/TomRichner/can-jev-bayes) | A repository evaluates whether Jev can solve Bayesian decision problems, contrasting its outputs with optimal strategies. It is a concrete benchmark rather than a generic Jev mention. | opinion | ★ 1 | 2026-09-20 |
| [Fact-checks Jev’s 200x performance hype](https://youtube.com/watch?v=no9G3N8PSIk) | A focused fact-check examining which of TypeSafe’s headline performance claims are actually proven. | opinion | ▶ 585 | 2026-09-20 |
| [Tested local models as Jev replacements on an M1](https://reddit.com/r/LocalLLM/comments/1wlj1u1/is_it_possible_to_replace_jev_with_local_model_on) | The author found 1.5B and 3B local models unreliable or narrow, while a 27B model judged better but took 20–50 seconds per decision and caused heavy swapping. | opinion | — | 2026-09-20 |
| [Explains where Jev beats LLMs and where it does not](https://jevai.net/articles/what-is-system-one-jev) | The article explains Jev’s System One framing and explicitly contrasts its strengths with situations where a traditional LLM remains preferable. | opinion | — | 2026-09-22 |
| [Narrow Jev’s claims while keeping routing value](https://eesel.ai/blog/typesafe-jev-review) | Review finds structured decisions compelling for high-volume routing and support triage, but says “can’t hallucinate” is oversold and treats launch benchmarks and pricing cautiously. | opinion | — | 2026-09-21 |
| [Use Jev for bounded decision forks, not generation](https://academy.codearia.com/en/articles/jev-typesafe-system-one-model) | Review checks launch claims against TypeSafe materials, notes it could not test the gated API, and argues Jev fits bounded forks better than whole-document or generative tasks. | opinion | — | 2026-09-20 |
| [Jev is faster and cheaper but less accurate](https://ayautomate.com/blog/jev-vs-llm-benchmark) | An independent 791-decision benchmark found Jev faster and cheaper than four LLMs and competitive with small models, but behind GPT-5.6 Terra on routing accuracy. | opinion | — | 2026-09-20 |
| [API tests find strong ergonomics and early-access rough edges](https://jevaiguide.com/jev-review) | Hands-on tests report low latency, inexpensive batches and reliable typed outputs, while finding wording sensitivity, documentation mismatches, waitlist friction and no public benchmarks. | opinion | — | 2026-09-19 |
| [Compared Jev with local readers on three benchmarks](https://morethanamachine.com/posts/jev-style-decisions-dgx-spark) | A hands-on DGX Spark comparison tests Jev, tuned encoders and Qwen on WANLI, BoolQ and ViZDoom, finding mixed quality alongside hosted-latency and setup limitations. | opinion | — | 2026-09-19 |
| [Measured Jev on 275 documents and a live app](https://baaderagency.com/blog/jev-typesafe-ai-first-three-days) | Baader reports that Jev’s speed, cost, and reliability held up in real work, while noting that judgment accuracy remains unestablished. | opinion | — | 2026-09-19 |
| [Measured Jev against fifteen models](https://wotai.co/blog/typesafe-jev-vs-claude-haiku-tested) | WotAI tested Jev and 15 models across passages, business categories, and commit types. Jev was fastest but did not win every accuracy or calibration metric. | opinion | — | 2026-09-18 |
| [Reports rapid Jev adoption through AI Gateway](https://vercel.com/blog/ai-gateway-jev-model-launch) | Vercel reports Jev reached nearly 13% of paid AI Gateway teams within 24 hours, while noting that long-term adoption remains uncertain. | opinion | — | 2026-09-18 |
| [Jev fits bounded decisions, not proven frontier replacement](https://kingy.ai/blog/typesafe-jev-review-the-ai-model-that-doesnt-generate-text) | The review favors Jev for high-volume bounded decisions with code-managed escalation, but questions benchmark references and unverified calibration claims. | opinion | — | 2026-09-15 |

<sub>34 entries judged mixed or negative. Judged on what the item itself reports, not on whether we agree with it.</sub>

## Browse by category

### Classification and routing

*Triage, intent detection, picking a team, a tool or a model for the next step.* — 18 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Cloudflare search relevance engine using Jev](https://github.com/superagents-lab/jev-search) | Cloudflare Worker app uses Jev for query interpretation, source selection, and relevance ranking, with TypeSafe, Vercel, and Workers AI provider paths. | code | ★ 454 | 2026-09-17 |
| [Classified 261 IRS forms at 100% accuracy](https://github.com/kyotofin/tax-doc-classifier) | A tax-page classifier reports 100% strict accuracy at about $0.001 per page, 34× cheaper and 6× faster than its previous LLM pipeline. | use case | ★ 448 | 2026-09-18 |
| [Builds a 400-response conversational classifier](https://reddit.com/r/projects/comments/1wlk8yu/typesafes_jev_model_work_as_an_llm) | Uses Jev to classify intent, formality, emotional intensity and human-escalation need across 18 parallel questions, then selects among 400 hand-written responses. | use case | ▲ 9 | 2026-09-20 |
| [Built prompt signals and routed Claude with Jev](https://reddit.com/r/LLMDevs/comments/1wkjufw/tried_using_jev_for_prompt_observability_and_llm) | Created a prompt oscilloscope that emits structured signals while typing, plus a Jev layer that routes requests before they reach Claude. | use case | ▲ 9 | 2026-09-19 |
| [Navigates Neo4j graphs with Jev classification](https://github.com/jexp/neo4jev) | A repository using Jev to classify neighbouring graph relationships and navigate a Neo4j graph. | code | ★ 134 | 2026-09-16 |
| [Config-driven Jev inbox classifier](https://github.com/parth-kp/jev-mail-classifier) | A repository that uses Jev to classify email and trigger configurable tag, move, flag, and notification actions. | code | ★ 18 | 2026-09-19 |
| [TypeScript log triage package using Jev](https://github.com/reachjalil/jevlogs/blob/main/skills/jevlogs/SKILL.md) | jevlogs asks structured Jev questions about log records and routes low-value records away from deeper LLM analysis. | code | ★ 13 | 2026-09-20 |
| [Built a 400-response conversational classifier](https://reddit.com/r/SideProject/comments/1wlkanb/typesafes_jev_model_work_as_an_llm) | Uses 18 parallel Jev questions to classify intent, tone and escalation needs, then selects among 400 hand-written responses. | use case | ▲ 3 | 2026-09-20 |
| [Built a 400-response conversational classifier](https://reddit.com/r/LLM/comments/1wlk823/typesafes_jev_model_work_as_an_llm) | Uses one Jev call with 18 parallel Choice, Score and Noul questions, then selects among 400 hand-written responses based on intent and sentiment. | use case | ▲ 3 | 2026-09-20 |
| [Route queries to the cheapest capable LLM](https://reddit.com/r/typesafe/comments/1wkri7o/build_a_llm_router_using_jev) | Uses Jev for fast classification in a cost-aware router that selects the cheapest model capable of handling each query. | use case | ▲ 3 | 2026-09-19 |
| [Route and prioritize support tickets with Jev](https://github.com/rajivkuriakose/typesafe-jev-examples) | Runnable OpenRouter examples ask seven parallel Jev questions to route tickets and assess impact, churn risk and billing-action confidence. | code | ★ 3 | 2026-09-18 |
| [TypeSafe model and tool router](https://github.com/TypeSafeAI/typesafe-router) | Runnable TypeSafeAI app that forwards requests to Jev, returns typed model or tool choices, and uses confidence thresholds for fallback behavior. | official | ★ 3 | 2026-09-17 |
| [Routed coding tasks through a measured Jev decision gate](https://reddit.com/r/hermesagent/comments/1wlfgg0/what_i_measured_calling_jev_typesafes_decision) | A hands-on test wires Jev through OpenRouter to route coding tasks, documenting the endpoint, typed billing/technical choice, probabilities, confidence, and observed behavior. | use case | ▲ 2 | 2026-09-20 |
| [Triage logs before sending them to expensive models](https://reddit.com/r/claudeskills/comments/1win16n/i_wrote_an_agent_skill_for_triaging_logs_with_jev) | A Claude Code skill asks Jev whether logs merit investigation, their urgency and diagnostic value, then routes selected records to a reasoning model while preserving uncertain and protected data. | use case | ▲ 2 | 2026-09-17 |
| [Route tasks across AI agents](https://github.com/AABBAASS1/jev-router) | A cross-platform Jev router selects the right AI agent in under one second, supporting Claude, ChatGPT, Cursor, and Antigravity with automatic launching. | code | ★ 2 | 2026-09-21 |
| [Routes Neovim AI commands with Jev intent classification](https://github.com/Mawfyy/jev-router.nvim) | A Neovim plugin uses Jev through the OpenRouter Decisions API to classify commands and dispatch them to matching handlers. | code | ★ 2 | 2026-09-20 |
| [Reviews Jev as a potential classification model](https://youtube.com/watch?v=X117w2Rark8) | A video framed around whether Jev is an ultimate classification model, offering a focused evaluation rather than merely announcing the product. | opinion | ▶ 322k | 2026-09-18 |
| [Loki autoroutes models with Jev decisions](https://reddit.com/r/typesafeai/comments/1wivgjq/jev_for_automodel_routing) | Loki Autorouter uses Jev for real-time agent judgments and dynamic model selection, exposed through a configurable /jev command. | code | ▲ 1 | 2026-09-17 |

### Extraction and scoring

*Pulling typed features out of text, scoring on rubrics, labelling data at scale.* — 13 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Score code quality with Jev](https://github.com/supercorp-ai/supercov/blob/main/docs/getting-started.md) | Supercov documents an optional Jev-backed code-quality scoring path alongside its local test-coverage workflow. | code | ★ 120 | 2026-09-23 |
| [Analyze roleplay tone and story state with Jev sensors](https://reddit.com/r/SillyTavernAI/comments/1wl7uje/jev_might_be_the_next_frontier_for_improving) | A SillyTavern extension sends recent responses to batched Jev questions about plot change, character outcomes, and alignment with the system prompt. | use case | ▲ 320 | 2026-09-20 |
| [Score project ideas with parallel typed evaluations](https://reddit.com/r/SideProject/comments/1wiw6tk/i_built_a_side_project_to_test_typesafes_jev) | An open-source app asks about ten Choice and scoring questions in parallel, then returns a numerical project-viability score instead of generating text. | use case | ▲ 244 | 2026-09-17 |
| [Run Jev classification inside ClickHouse](https://reddit.com/r/Clickhouse/comments/1wm53m0/llm_as_a_judge_inside_clickhouse_native_cloud_jev) | Uses Jev as a classification judge from ClickHouse Cloud through a network-capable UDF, documenting a database-native integration. | use case | ▲ 6 | 2026-09-21 |
| [Jev-powered semantic grep for code questions](https://github.com/fajarhide/askgrep) | askgrep searches code by questions that cannot be expressed as a text pattern and reads every function rather than sampling a subset. | code | ★ 4 | 2026-09-21 |
| [Terminal discography classifier using Jev](https://github.com/lirantal/discoprint) | A terminal dashboard classifies an artist's discography by theme, mood and lyrical complexity using Jev, then presents the results visually. | code | ★ 4 | 2026-09-20 |
| [Built a market-analysis desk with 215 typed judgments per pass](https://reddit.com/r/ClaudeCode/comments/1wjgk0q/built_a_live_marketanalysis_desk_in_claude_code) | A Claude Code market-analysis pipeline evaluates news and tickers with 35 requests and 215 questions in 2.7 seconds for $0.0026, using typed probabilities and scores for routing. | use case | ▲ 4 | 2026-09-18 |
| [Resolve entities in high-throughput data pipelines](https://southbridge.ai/blog/jev-entity-resolution) | The article describes using a System One model, apparently Jev, for entity resolution inside high-throughput data pipelines. | use case | ▲ 3 | 2026-09-20 |
| [Rerank and compress JSON results with Jev](https://github.com/shinpr/jev-reranker) | A repository using Jev to rerank, filter, and compress JSON search results. | code | ★ 3 | 2026-09-20 |
| [Scores project ideas with Jev](https://reddit.com/r/AIBubble/comments/1wj5i24/i_built_a_side_project_to_test_typesafes_jev) | A side project uses Jev without a generative LLM to evaluate project ideas, though the post provides no further implementation or results. | use case | ▲ 2 | 2026-09-17 |
| [Watfile file categorization with Jev or local models](https://github.com/jexp/watfile) | A tool for categorizing and sorting text or PDF files using TypeSafe AI Jev or a local calibrated decision model. | code | ★ 2 | 2026-09-20 |
| [Expose semantic conversation filters through ObsessionDB](https://reddit.com/r/Clickhouse/comments/1wkro0h/we_just_launched_jev_on_obsessiondb) | ObsessionDB integrates Jev into SQL AI functions for semantic filters, probabilities and frustration scores, batching up to 50 rows per request. | use case | — | 2026-09-20 |
| [Score blog drafts for editing decisions](https://sidbharath.com/blog/the-complete-guide-to-jev) | A blog-editing workflow uses Jev to score AI tells, voice, editing, and SEO while an LLM performs the rewrite. | use case | — | 2026-09-20 |

### Guardrails and verification

*Checking LLM output, safety gates, fact and policy checks, hallucination catches.* — 14 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Real-time exchange risk-triage gateway](https://github.com/klauswg/jev-guard) | A Jev-backed gateway for exchange deposits and withdrawals uses Jev only for triage while deterministic code retains final authority. | code | ★ 36 | 2026-09-22 |
| [Building a Jev safety layer for agent tool uses](https://reddit.com/r/PiCodingAgent/comments/1whsav6/anyone_else_testing_out_typesafe_ais_new_system) | The author is testing Jev to scan every tool call and return a safety rating, with plans to add prompt-intent and reasoning checks plus model routing. | use case | ▲ 115 | 2026-09-16 |
| [Node.js multilingual profanity and toxicity screener](https://github.com/ItisShikhar/gg-friggin-ez) | A Jev-powered Node.js screener for multilingual profanity, including leetspeak, spacing and romanized forms, with reported 50–500 ms latency. | code | ★ 7 | 2026-09-19 |
| [Use Jev confidence to decide when to escalate](https://reddit.com/r/LLMDevs/comments/1wkwqu2/what_is_jev_typesafes_system_one_model_explained) | The author explains Jev's typed decisions, latency, pricing, and confidence signal, while noting benchmark caveats and recommending confidence-based human or larger-model escalation. | opinion | ▲ 91 | 2026-09-19 |
| [Benchmarks Jev secret detection with Noul and category decisions](https://github.com/teyhouse/jev-secret-detection) | Open-source tests Jev on secret-detection datasets derived from gitleaks, GitGuardian and others, finding promising results while questioning production cost. | code | ★ 3 | 2026-09-17 |
| [Graded harmful prompts across four benchmarks](https://reddit.com/r/singularity/comments/1wiq7vn/jev_from_typesafeai_is_getting_hyped_quite_a_bit) | Used Jev as an alignment monitor for grading harmful prompts and generations, reporting better results and lower cost than other tested solutions. | use case | ▲ 55 | 2026-09-17 |
| [Auto-approves harmless OpenCode permissions](https://reddit.com/r/opencodeCLI/comments/1wl5k2c/i_built_jevvy_autoapprove_harmless_opencode) | Jevvy reviews routine shell permission prompts with calibrated questions, preserving prompts when uncertain and supporting TypeSafe AI or Zen. | code | ▲ 30 | 2026-09-20 |
| [Agent tool-call chaperone using Jev](https://github.com/agent-chaperone/agent-chaperone) | Show HN project that screens AI agent tool calls and their results with Jev before they proceed. | code | ▲ 4 | 2026-09-21 |
| [LangChain-ready Jev security gate for agent tools](https://github.com/lgy1027/jevshield) | Provides Choice, Noul and Score evaluations, calibrated-confidence routing, fail-closed parsing and a local fallback for blocking risky agent tool calls. | code | ★ 2 | 2026-09-20 |
| [Authorize agent tool calls with Jev policies](https://github.com/omkarghugarkar007/actiongate-jev) | Actiongate-jev provides runtime authorization and guardrails for AI-agent tool calls using deterministic policies and Jev through OpenRouter. | code | ★ 2 | 2026-09-19 |
| [Models deployment decisions with 18 editable Jev questions](https://reddit.com/r/typesafe_jev/comments/1wmmweg/we_built_a_deployment_demo_with_18_editable_jev) | HeyJev asks 18 typed questions about a deployment, exposes the probabilities, and maps them through application rules to a verdict such as “GO TOUCH GRASS.” | use case | ▲ 1 | 2026-09-21 |
| [Run parallel claim checks and citation judgments with Jev](https://github.com/Ashadeepa/typesafe-jev-model-use-cases) | Runnable demos use parallel Noul judgments and a Choice-based citation and claim checker built on Jev. | code | ★ 1 | 2026-09-19 |
| [Gate coding-agent commands and route issues with Jev](https://github.com/ThiagaoBR/typesafe_agent_gates) | LangChain/Deep Agents middleware applies typed Jev judgments to shell-command safety, issue severity, merge requests and weakened tests, with live probes. | code | ★ 1 | 2026-09-19 |
| [Scanned codebases for malicious behavior with Jev](https://reddit.com/r/LLMDevs/comments/1wjt1a4/built_a_codebase_scanner_with_jev_that_helps_you) | The is-malicious tool uses Jev to identify hidden, deceptive, or data-stealing code and point users to suspicious file locations for review or pull-request gating. | use case | ▲ 1 | 2026-09-18 |

### Agent and workflow logic

*Conditional branches, skill selection, planning steps and loops inside agents.* — 20 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Hermes plugin compacts context without rewriting messages](https://reddit.com/r/hermesagent/comments/1wkpl3q/integrated_the_jev_context_engine_into_hermes) | A Hermes plugin uses Jev to remove or shrink old tool-call bulk while preserving user and agent messages verbatim. It includes fallbacks, metrics, shadow comparison, and a FastAPI dashboard. | code | ▲ 138 | 2026-09-19 |
| [Agent memory with Jev reranking](https://github.com/kitfunso/hippo-memory) | A zero-dependency SQLite/MCP memory system that includes an opt-in hosted Jev reranker and benchmarks retrieval. | code | ★ 757 | 2026-03-15 |
| [Codex router driven by Jev](https://github.com/0xNatoshi/jev-codex-router) | A GitHub router that selects Codex’s model, reasoning depth, and speed mode on every turn using Jev decisions. | code | ★ 272 | 2026-09-17 |
| [Jive terminal agent built from Jev-backed execution graphs](https://reddit.com/r/coolgithubprojects/comments/1wmp07o/jive_rethinking_the_agentic_loop_with_system_one) | Open-source coding agent replacing sequential tool calls with DAGs containing tool and Jev calls. Reports faster benchmark runs than Codex and Claude Code on several tasks. | code | ▲ 51 | 2026-09-21 |
| [Rank agent skills with Jev and live session context](https://github.com/Dicklesworthstone/skillranker) | A Rust CLI ranks skills for the next agent step using Jev, with Claude Code hooks, structured JSON, abstention, and local feedback. | code | ★ 120 | 2026-09-17 |
| [Control agent memory with Jev](https://github.com/libingzheren/Jev-Mem) | Jev-Mem uses Jev to govern memory admission, graph relationships, retrieval routing, scoring, and stopping while another model generates answers. | code | ★ 87 | 2026-09-20 |
| [Agent decision layer with MCP and escalation](https://github.com/Brainwires/jevwire) | Jevwire combines an MCP server, embeddable DecisionModel library, and an escalate-only Claude Code plugin for Jev-powered agent decisions. | code | ★ 20 | 2026-09-17 |
| [Gate agent work with Jev](https://github.com/Bodila51/muse-jev-playbook) | A Muse playbook adds a fast, inexpensive Jev decision layer with confidence policies, recipes, and routing before costly agent execution. | code | ★ 17 | 2026-09-22 |
| [Choose compiler optimisations with Jev](https://github.com/Ramneet-Singh/jevopt) | Jevopt applies Jev to compiler optimisation decisions, using typed judgments to help select optimisation strategies. | use case | ▲ 2 | 2026-09-22 |
| [Context garbage collector using Jev for agent prompts](https://reddit.com/r/LLMDevs/comments/1wmzhn5/built_a_context_garbage_collector_for_llm_agents) | jev-gc uses OpenTelemetry spans and Jev to decide what agent context to retain, compress to pointers, or archive. It reports a concrete case where Jev beat keyword matching. | code | ▲ 2 | 2026-09-22 |
| [Control Windows and Android devices from Jev tasks](https://reddit.com/r/typesafe_ai/comments/1wkkp8n/i_built_jevpilot_an_opensource_app_that_lets_an) | JevPilot is an open-source computer-use app that executes tasks across Windows and Android, supports phone confirmations for risky actions, and offers game adapters. | code | ▲ 2 | 2026-09-19 |
| [Reflex-based CLI and package manager](https://github.com/evoke-build/evoke) | Evoke turns sentences into calls to small programs selected by Jev, with shareable reflex recipes, a Git package manager, CLI, and TypeScript SDK. | code | ★ 16 | 2026-09-21 |
| [Automated browser actions with Jev micro-loops](https://reddit.com/r/AI_Agents/comments/1wkmp2z/why_calling_cloud_llms_for_every_browser_click_is) | BrowserClaw uses Jev to evaluate compact DOM snapshots and execute browser actions in 200–400 ms, with heuristic fallback and escalation for sensitive or low-confidence steps. | use case | ▲ 1 | 2026-09-19 |
| [CLI and agent skill for direct Jev judgments](https://github.com/okooo5km/jev/blob/main/README.en.md) | Open-source shell tooling runs typed Jev judgments for tasks such as refund checks and review escalation, with TypeSafe and OpenRouter backends. | code | ★ 10 | 2026-09-20 |
| [Compose typed Jev judgments into workflows](https://github.com/Mawfyy/jevflow) | Provider-agnostic backend primitives for Noul, Score and Choice decisions, with deterministic thresholds and explainable workflows. | code | ★ 9 | 2026-09-20 |
| [Automated AI video editing with Jev](https://youtube.com/watch?v=ZlICPWwgmmg) | The video presents a full guide claiming Jev can solve AI video-editing workflows, but the supplied metadata gives no further implementation details. | use case | ▶ 17.5k | 2026-09-22 |
| [Runtime for Jev verdicts](https://github.com/backant-io/jevelry) | A runtime that accepts Jev inputs and produces typed verdicts for TypeSafe System One workflows. | code | ★ 6 | 2026-09-22 |
| [Replaced small coding-agent judgments with Jev](https://reddit.com/r/selfhosted/comments/1wlb3d3/we_replaced_the_small_llm_calls_in_our) | The trau pipeline uses Jev for ticket complexity, readiness, lesson applicability and repair-loop decisions, returning ten typed judgments in one request. | use case | — | 2026-09-20 |
| [Route recipe and scraper agents from transcripts](https://reddit.com/r/LLMDevs/comments/1wihigc/tried_typesafes_new_decisiononly_model_jev_as_an) | Developer used Jev to choose between recipe and scraper agents from Instagram-reel transcripts, with reported end-to-end times of 145ms and 271ms across two cases. | use case | — | 2026-09-17 |
| [Documents Jev integrations for coding agents](https://docs.typesafe.ai/introduction/coding-agents) | TypeSafe’s documentation covers the System One distinction, playground and SDK quick starts, an agent skill, and common coding-agent patterns. | official | — | 2026-09-22 |

### Real-time and games

*Latency-critical decisions: games, live UX, trading, anything under a second.* — 15 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Played Minecraft while fleeing nighttime zombies](https://reddit.com/r/accelerate/comments/1whk9oy/new_typesafe_ai_jev_model_playing_minecraft_wip) | A work-in-progress Jev-driven Minecraft demo shows an agent responding to the game state, reportedly without consuming API credits. | use case | ▲ 41 | 2026-09-16 |
| [QuantDinger trading gate with Jev](https://github.com/OpenByteInc/QuantDinger) | Trading system adds a Jev pre-trade gate that evaluates order and risk context, records probabilities and confidence, fails open on provider failure, and leaves exits ungated. | code | ★ 12.1k | 2025-12-28 |
| [Controlled real-time Ultima Online combat decisions](https://reddit.com/r/ultimaonline/comments/1wj1r14/testing_system_one_model_jev_on_ultima_online) | The author replaced scripted combat decisions with Jev, using it to control combat in real time where Claude was too slow to react. | use case | ▲ 29 | 2026-09-17 |
| [Control a Clash Royale bot with Jev / 用 Jev 控制《皇室战争》机器人](https://github.com/Atikpui007/clash-jev) | A Clash Royale bot uses Jev System One to make every decision from live game state without a trained policy. / 一个《皇室战争》机器人无需训练策略，仅根据实时游戏状态让 Jev System One 做出所有决策。 | use case | ★ 33 | 2026-09-21 |
| [Trade futures every 30 seconds with Jev](https://reddit.com/r/ObsideAI/comments/1wkpsxs/i_let_jev_ai_trade_every_30_seconds_for_more_than) | A futures scalping bot used Jev to choose actions on micro futures for over 24 hours, losing about 3.15% across roughly 731 simulated trades. | use case | ▲ 25 | 2026-09-19 |
| [Ran a 24-hour Jev futures scalping experiment](https://reddit.com/r/ai_trading/comments/1wkq4lt/i_let_jev_ai_trade_every_30_seconds_for_more_than) | A bot queried Jev every 30 seconds across MNQ, MBT and MGC. After 731 simulated trades it lost 3.15%, with 779 ms average decision latency. | use case | ▲ 5 | 2026-09-19 |
| [Interactive Jev experiments for routing and 3D driving](https://github.com/kavehmz/typesafe-playground) | A playground of interactive Jev experiments, including support routing and 3D driving simulations with visible sensor inputs. | code | ★ 14 | 2026-09-17 |
| [Played Slay the Spire 2 to the first boss with Jev](https://reddit.com/r/ArtificialInteligence/comments/1wkjatd/i_hooked_jev_up_to_slay_the_spire_2_it_made_it_to) | A bridge reads live game state and asks Jev for moves every few seconds. It ran for about an hour, cost three cents, and reached the first boss despite incomplete strategy handling. | use case | ▲ 4 | 2026-09-19 |
| [Polymarket trading bot driven by Jev](https://github.com/markusbug/jevymarket) | A trading bot uses Jev through OpenRouter to drive Polymarket decisions. | code | ★ 9 | 2026-09-20 |
| [Tested Jev for browser FPS combat decisions](https://reddit.com/r/LLMDevs/comments/1wlauz2/i_built_a_browser_fps_with_an_impossible_to_beat) | The author used Jev to experiment with CPU movement and shooting in a browser FPS, but ultimately chose another classifier for the actual game logic. | use case | ▲ 2 | 2026-09-20 |
| [Chess game against Jev via OpenRouter](https://github.com/dperezcabrera/jev-chess) | A chess project lets users play against Jev through OpenRouter and is built with the pico framework. | code | ★ 3 | 2026-09-21 |
| [React companion that maps messages to 14 facial moods](https://github.com/AppChainAI/Jevatar) | Jev judges each message and selects one of 14 moods, driving a morphing facial-expression avatar built with React, Vite and Bun. | code | ★ 1 | 2026-09-22 |
| [Benchmarked Jev as a Doom controller](https://reddit.com/r/LocalLLM/comments/1wl21ad/i_gave_jev_laya_finetuned_modernce_and_qwen35_the) | A controlled ViZDoom comparison tested hosted Jev against three local models over eight seeds, reporting 117 ms median and 200 ms p95 Jev latency. | use case | — | 2026-09-20 |
| [Controls a Minecraft bot with four Jev decisions per tick](https://reddit.com/r/Minecraft/comments/1wl5wsd/typesafeais_model_jev_plays_minecraft_in_realtime) | A Mineflayer bot sends JSON game state to Jev every 600 ms, asking parallel threat, action, eating, and flee-direction questions; confidence thresholds trigger actions or safe fallbacks. | use case | — | 2026-09-20 |
| [Simulate airport clearances with Jev in a voice loop](https://reddit.com/r/AgentZero/comments/1wj6li0/i_tested_typesafes_jev_model_and_made_it_run_a) | Jev supplies judgments for each clearance in a simulated JFK air-traffic-control setup while realtime voice models handle radio dialogue. | use case | — | 2026-09-20 |

### Benchmarks and comparisons

*Head-to-head tests against LLMs on speed, cost, accuracy and calibration.* — 30 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Benchmark Jev against GPT-5.6-Luna across 49 tasks](https://reddit.com/r/OpenAI/comments/1wkgkrz/i_benchmarked_jev_aginst_gpt56luna) | Across about 8,200 items, Jev matched or beat the baseline on 42 of 49 tasks, with lower latency and cost and roughly half its calibration error. | opinion | ▲ 128 | 2026-09-19 |
| [Evaluates Jev as a classification model](https://youtube.com/watch?v=X117w2Rark8&t=114s) | A video presents an evaluation of whether Jev is an effective general-purpose classification model. | opinion | ▶ 322k | 2026-09-18 |
| [Add Jev to a model benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark/blob/main/docs/jev.md) | A benchmark repository compares direct Jev calls with Qwen structured output and preserves validated responses, raw requests, and timings. | code | ★ 39 | 2026-09-17 |
| [Finds classical ML stronger on most tested datasets](https://reddit.com/r/LLMDevs/comments/1wlc11f/jev_vs_classical_ml_results_from_8_classification) | Across eight classification datasets, Jev beat classical models on IMDb but generally lagged on labelled-data tasks; the author would keep trained local models. | opinion | ▲ 80 | 2026-09-20 |
| [DSPy calibration and selective-risk benchmark lab](https://github.com/jmanhype/jev-dspy-lab) | Provides reproducible calibration and selective-risk benchmarks for Jev decisions integrated into DSPy workflows. | code | ★ 9 | 2026-09-17 |
| [Jev matches or beats Terra on many knowledge benchmarks](https://reddit.com/r/accelerate/comments/1wik61b/tested_typesafeai_s_claim_that_their_new_model) | A multi-benchmark comparison reports strong Jev results on MMLU, GPQA, WinoGrande and HellaSwag, while noting a substantial loss on math reasoning and much lower cost. | opinion | ▲ 75 | 2026-09-17 |
| [Examines whether Jev could replace LLMs](https://youtube.com/watch?v=2vYV4K1RQ1w) | A high-reach explainer comparing Jev’s role with LLMs and questioning whether typed decision models can replace them. | opinion | ▶ 122.7k | 2026-09-22 |
| [Local models outperform Jev in legal RAG](https://reddit.com/r/Rag/comments/1wm4oqg/jev_system_one_cloud_vs_local_models_distilbert) | A measured UK-legislation benchmark reports local models were much faster and cheaper for routing, reranking, and verification, while Jev falsely accepted fabricated law. | opinion | ▲ 29 | 2026-09-21 |
| [Audit Jev robustness and failure modes](https://github.com/Yifan-Lan/awesome-jev-robustness) | A repository of tests and calibration audits examining jaggedness, consistency, prompt injection, and abstention in Jev. | code | ★ 5 | 2026-09-23 |
| [Benchmarked Jev against Terra on knowledge tasks](https://reddit.com/r/ProAI/comments/1wik66s/tested_typesafeai_s_claim_that_their_new_model) | The author reports Jev outperforming Terra on several multiple-choice benchmarks, losing mainly on math, with low cost and generally well-calibrated probabilities. | opinion | ▲ 12 | 2026-09-17 |
| [Compare Jev with GPT-6 Astra for decisions](https://vercel.com/i/jev-vs-gpt-6-astra) | Vercel compares Jev's typed, probabilistic decisions with GPT-6 Astra's generation, vision, and tool use, including routing examples and guidance on combining both. | official | ▲ 4 | 2026-09-22 |
| [MCP server for calibrating Jev questions](https://github.com/simota/tenbin) | Tenbin decomposes judgments, lints Choice/Score/Noul questions, evaluates labelled examples, and proposes confidence thresholds before production use. | code | ★ 3 | 2026-09-18 |
| [Tests whether Jev can beat transformer models](https://youtube.com/watch?v=NIlQsncfVYs) | An explainer that directly questions Jev’s advantage over transformer models and discusses the System One framing. | opinion | ▶ 16.8k | 2026-09-16 |
| [Open-source 350M browser model for typed decisions](https://reddit.com/r/SideProject/comments/1wk08l6/i_tried_jevstyle_typed_decisions_with_a_350m) | Decision Lab implements Jev-style typed decisions locally, reporting 83% benchmark accuracy but 59.6% workflow field accuracy and contradictions from independent field scoring. | code | ▲ 1 | 2026-09-18 |
| [Benchmarks Jev-assisted web form filling against monolithic Claude](https://reddit.com/r/ClaudeWorkflows/comments/1wj7imp/workflow_benchmarking_llm_architectures_for_web) | Compares Claude planning plus Jev execution with Claude and Playwright MCP, arguing that planning costs dominate web-automation economics. | opinion | ▲ 1 | 2026-09-17 |
| [Compares Jev with Laya amid controversy](https://youtube.com/watch?v=OLgiHBlDhWU) | The video explicitly compares TypeSafe AI’s Jev with Laya and addresses the controversy around them, making a focused evaluative claim. | opinion | ▶ 7.3k | 2026-09-22 |
| [Benchmark Jev against LLMs, BERT, and Laya](https://reddit.com/r/AI_India/comments/1wmvyqz/i_benchmarked_typesafes_jev_against_llms_bert_and) | Healthcare voice-AI builder compares six classifiers on SST-2, AG News, and Banking77, reporting flat Jev latency but 380ms p50 through OpenRouter and stronger high-label performance. | opinion | — | 2026-09-22 |
| [Evaluated Jev as a retrieval and answer-quality judge](https://reddit.com/r/LocalLLaMA/comments/1wmkr01/on_a_small_pilot_gemma_4_e2bs_verbalized) | A pilot used Jev to judge search decisions and citation support in a local Gemma pipeline. Jev ranked passages better, but the full pipeline scored 0.612 versus a 0.740 no-judge baseline. | use case | — | 2026-09-21 |
| [Tests Jev against Bayesian-optimal strategies](https://github.com/TomRichner/can-jev-bayes) | A repository evaluates whether Jev can solve Bayesian decision problems, contrasting its outputs with optimal strategies. It is a concrete benchmark rather than a generic Jev mention. | opinion | ★ 1 | 2026-09-20 |
| [42-claim Jev fact-verification benchmark](https://github.com/TheWayWithin/jev-bench) | Benchmarks whether cited sources support claims, comparing Jev with GPT-5.4, Claude Sonnet 5 and Gemini 3.1 Pro. | code | ★ 1 | 2026-09-20 |
| [Fact-checks Jev’s 200x performance hype](https://youtube.com/watch?v=no9G3N8PSIk) | A focused fact-check examining which of TypeSafe’s headline performance claims are actually proven. | opinion | ▶ 585 | 2026-09-20 |
| [Measure and patch Jev routing before Claude Code](https://github.com/Pasblinn/jev-lab) | An open lab for Jev routing in front of Claude Code, including measured bugs, a patch, hard fallback behavior and alerts. | code | ★ 1 | 2026-09-20 |
| [Route models faster with Jev than a structured LLM](https://reddit.com/r/AI_Agents/comments/1wl82fr/tried_typesafe_ais_jev_vs_a_regular_llm_for_model) | A developer reports equivalent routing signals but roughly one second with Jev versus four to fourteen seconds with a regular structured-output LLM. | opinion | — | 2026-09-20 |
| [Benchmarked Jev against GPT-5.6 Luna across 49 tasks](https://reddit.com/r/LocalLLM/comments/1wkgk5m/i_benchmarked_jev_against_gpt56luna) | Tested Jev on about 8,200 labelled items and synthetic math problems, finding better task scores, lower latency and cost, and roughly half the calibration error. | opinion | — | 2026-09-19 |
| [Explains where Jev beats LLMs and where it does not](https://jevai.net/articles/what-is-system-one-jev) | The article explains Jev’s System One framing and explicitly contrasts its strengths with situations where a traditional LLM remains preferable. | opinion | — | 2026-09-22 |
| [Jev is faster and cheaper but less accurate](https://ayautomate.com/blog/jev-vs-llm-benchmark) | An independent 791-decision benchmark found Jev faster and cheaper than four LLMs and competitive with small models, but behind GPT-5.6 Terra on routing accuracy. | opinion | — | 2026-09-20 |
| [Publishes TypeSafe AI's “Antibenchmaxxing” post](https://typesafe.ai/blog/antibenchmaxxing) | An official TypeSafe AI blog post; the supplied entry does not describe its specific argument or content. | official | — | 2026-09-20 |
| [Compared Jev with local readers on three benchmarks](https://morethanamachine.com/posts/jev-style-decisions-dgx-spark) | A hands-on DGX Spark comparison tests Jev, tuned encoders and Qwen on WANLI, BoolQ and ViZDoom, finding mixed quality alongside hosted-latency and setup limitations. | opinion | — | 2026-09-19 |
| [Pre-registered Jev versus Claude evaluation](https://primeline.cc/blog/typesafe-jev-pre-registered-test) | PrimeLine documents a four-model, two-job evaluation focused on question design and selective prediction, finding Jev confidence useful for deciding which outputs to trust. | opinion | — | 2026-09-18 |
| [Measured Jev against fifteen models](https://wotai.co/blog/typesafe-jev-vs-claude-haiku-tested) | WotAI tested Jev and 15 models across passages, business categories, and commit types. Jev was fastest but did not win every accuracy or calibration metric. | opinion | — | 2026-09-18 |

### Speed, pricing and access

*Latency numbers, the pricing model, early-access experience and availability.* — 12 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Explains Jev's speed and price advantage with a caveat](https://youtube.com/watch?v=qdji39XXgEY) | The video argues that Jev is fast and inexpensive while explicitly examining a limitation or trade-off. | opinion | ▶ 31.5k | 2026-09-18 |
| [Explains Jev’s 200 ms typed-decision model](https://youtube.com/watch?v=6RdpGVfqd4A) | A focused explanation of Jev’s low-latency decisions and lack of token streaming, based on the title’s concrete technical framing. | opinion | ▶ 15.6k | 2026-09-17 |
| [Argues Jev could reshape AI economics](https://thefinancialengineer.substack.com/p/typesafes-jev-is-about-to-change) | The article makes a bullish case that Jev’s low-cost, fast typed decisions could change how AI systems are built and priced. | opinion | ▲ 4 | 2026-09-17 |
| [Questions Jev's pricing and performance claims](https://reddit.com/r/codex/comments/1whmrui/typesafe_ai_jev_is_100x_cheaper_than_lunamax_and) | The author is skeptical of TypeSafe's reported cost and speed advantages, while arguing that such economics could enable large swarms of cheap decision models if validated. | opinion | ▲ 4 | 2026-09-16 |
| [Removes Jev's waitlist](https://x.com/typesafeai/status/2101786156572823624) | TypeSafe AI announces that Jev is available to everyone without a waitlist, documenting a change in access availability. | official | ▲ 3 | 2026-09-20 |
| [Evaluates whether Jev is worth using](https://youtube.com/watch?v=7aAq5J64K34) | A video review of TypeSafe’s RLCD Jev model that assesses its practical value, though the supplied description gives no test details. | opinion | ▶ 2.6k | 2026-09-18 |
| [Offer browser access to the Jev API](https://jevtypesafeai.com/) | The official site presents Jev as a typed, calibrated System One decision model, offers a browser trial, and documents API access and latency. | official | — | 2026-09-23 |
| [Use Jev for bounded decision forks, not generation](https://academy.codearia.com/en/articles/jev-typesafe-system-one-model) | Review checks launch claims against TypeSafe materials, notes it could not test the gated API, and argues Jev fits bounded forks better than whole-document or generative tasks. | opinion | — | 2026-09-20 |
| [API tests find strong ergonomics and early-access rough edges](https://jevaiguide.com/jev-review) | Hands-on tests report low latency, inexpensive batches and reliable typed outputs, while finding wording sensitivity, documentation mismatches, waitlist friction and no public benchmarks. | opinion | — | 2026-09-19 |
| [Measured Jev on 275 documents and a live app](https://baaderagency.com/blog/jev-typesafe-ai-first-three-days) | Baader reports that Jev’s speed, cost, and reliability held up in real work, while noting that judgment accuracy remains unestablished. | opinion | — | 2026-09-19 |
| [Reports rapid Jev adoption through AI Gateway](https://vercel.com/blog/ai-gateway-jev-model-launch) | Vercel reports Jev reached nearly 13% of paid AI Gateway teams within 24 hours, while noting that long-term adoption remains uncertain. | opinion | — | 2026-09-18 |
| [Presents TypeSafe AI and Jev early access](https://typesafe.ai/) | TypeSafe AI's official homepage describes its automation focus and announces Jev as its first System One model in early access. | official | — | 2026-09-16 |

### Model and research

*How it works: System One framing, calibrated decisions, RLCD, what it cannot do.* — 29 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Jev is fast, cheap, and accurate for decisions](https://reddit.com/r/ArtificialInteligence/comments/1wkhsyh/jev_typesafeai_is_revolutionary_as_llms) | The author argues that Jev's decision-only interface is highly effective after adapting one's thinking, emphasizing speed, cost, accuracy, and creative querying. | opinion | ▲ 157 | 2026-09-19 |
| [Breaks down Jev as a code-focused AI model](https://youtube.com/watch?v=2Bs0Ink_-Uo) | A video explainer examines Jev's positioning as the first AI model built specifically for code. | opinion | ▶ 369.8k | 2026-09-17 |
| [Gallery of Jev papers, reproductions and evaluations](https://github.com/OmniJev/awesome-jev-gallery) | A curated gallery covering System One research, open reproductions and independent Jev evaluations. | code | ★ 347 | 2026-09-17 |
| [Jev improves classifiers more than it creates new AI](https://reddit.com/r/learnmachinelearning/comments/1wmhwdu/what_everyone_is_getting_wrong_about_typesafe_ais) | The author argues that Jev resembles existing classifiers and zero-shot systems, while its architecture and training may still be novel. They caution that internal details and independent benchmarks remain limited. | opinion | ▲ 17 | 2026-09-21 |
| [Frames Jev as a smart switch, not an LLM replacement](https://reddit.com/r/indotech/comments/1witl7h/introducing_system_one_models_jev_typesafe_ai_blog) | The post explains Jev's fixed-choice limits and strengths in routing, scoring and verification, while rejecting the implication that System One framing implies AGI. | opinion | ▲ 6 | 2026-09-17 |
| [Tries TypeSafe’s Jev model hands-on](https://youtube.com/watch?v=CcmqPS6q9Gw) | A hands-on video testing Jev in practice; the title does not reveal the result or scope of the evaluation. | opinion | ▶ 12.7k | 2026-09-18 |
| [Argues for pragmatic System One models in production](https://latent.space/p/jev) | An interview-style discussion of Jev and TypeSafe AI framed around production use rather than treating System One as a general replacement for LLMs. | opinion | ▲ 4 | 2026-09-21 |
| [Livestream Jev coding with constrained decoding](https://youtube.com/watch?v=5Lx4DLLYafM) | A coding session focused on the new Jev model and parallel constrained decoding, indicating a concrete implementation or experiment. | code | ▶ 12.3k | 2026-09-20 |
| [Documents Jev 1.13 model jaggedness](https://docs.typesafe.ai/model-jaggedness/jev-1.13) | TypeSafe AI documents the jaggedness characteristics and limitations of the Jev 1.13 model. | official | ▲ 3 | 2026-09-21 |
| [Explains where System One models fit in the stack](https://stackness.dev/blog/what-is-a-system-one-model-and-where-does-it-go-in-your-stack) | An explainer argues for a role for System One models such as Jev within application stacks, distinct from conventional LLMs. | opinion | ▲ 3 | 2026-09-18 |
| [Argues Jev’s non-LLM design is its advantage](https://forkast.news/typesafe-ais-jev-is-not-an-llm-and-that-may-be-the-point) | The piece frames Jev’s departure from language-model generation as deliberate and potentially valuable for focused decision tasks. | opinion | ▲ 3 | 2026-09-18 |
| [Argues for moving on from TypeSafe Jev](https://youtube.com/watch?v=dZnKGHsImxo) | A video whose title signals a negative verdict or alternative to Jev, though it provides no details about the basis of that conclusion. | opinion | ▶ 9k | 2026-09-20 |
| [Explains Jev’s System One model concept](https://unzip.dev/0x025-system-one-models) | An explainer focused on TypeSafe AI’s System One models and Jev, with enough topic specificity to merit inclusion despite limited supplied detail. | opinion | ▲ 1 | 2026-09-22 |
| [Jev argues for typed judgments over generated text](https://reddit.com/r/JevTypesafeAI/comments/1wm7zwm/jev_the_end_of_text_generation_why_rlcd_and) | The author argues that forcing LLMs to emit structured values creates fragile parsing and guardrail layers, positioning Jev's RLCD/System One design as a better software interface. | opinion | ▲ 1 | 2026-09-21 |
| [Explains Jev’s typed decisions and confidence caveats](https://reddit.com/r/ChatGPT/comments/1wkwscw/what_is_jev_typesafes_system_one_model_explained) | An infographic-based explainer highlights typed outputs, confidence-based gating, benchmark cost and latency, while noting limits in TypeSafe’s evaluations. | opinion | ▲ 1 | 2026-09-19 |
| [Survey Jev-like typed decision models](https://github.com/Eurekaleo/awesome-jev-survey) | A searchable evidence survey covering calibration, selective control, and open implementations of Jev and related typed-decision models. | code | ★ 4 | 2026-09-23 |
| [Explains Jev as a decision layer, not an LLM replacement](https://reddit.com/r/ArtificialInteligence/comments/1wl2our/spent_over_2_hours_going_through_the_jev_docs_and) | After working through the docs, the author explains Jev’s typed choices, scores and checks, and demonstrates the API through the playground, curl, Python SDK and an agent. | opinion | — | 2026-09-20 |
| [Argues Jev is a decision model, not a chatbot](https://youtube.com/watch?v=1cuUm-k3e9Y) | An explainer emphasizing Jev's distinction from conversational chatbots and its typed-decision role. | opinion | ▶ 2.2k | 2026-09-16 |
| [Jev model overview](https://jevtypesafe.org/) | TypeSafe AI describes Jev as a fast System One model for structured decisions such as routing, classification and scoring, used alongside generative LLMs. | official | — | 2026-09-23 |
| [Narrow Jev’s claims while keeping routing value](https://eesel.ai/blog/typesafe-jev-review) | Review finds structured decisions compelling for high-volume routing and support triage, but says “can’t hallucinate” is oversold and treats launch benchmarks and pricing cautiously. | opinion | — | 2026-09-21 |
| [Explains Jev’s non-autoregressive decision model](https://mindstudio.ai/blog/jev-system-one-model-launch) | An explainer argues that Jev matters because it outputs typed decisions, probabilities and confidence directly rather than generating text token by token. | opinion | — | 2026-09-20 |
| [Discusses when AI is too good or too limited](https://typesafe.ai/blog/ai-too-good-to-be-true-too-bad-to-be-useful-typesafe-ai) | An official TypeSafe AI blog post addressing whether AI can be both too good to be true and too bad to be useful. | official | — | 2026-09-20 |
| [Publishes TypeSafe AI's “Bitterest lesson” post](https://typesafe.ai/blog/bitterest-lesson) | An official TypeSafe AI blog post; the supplied entry does not describe its specific argument or content. | official | — | 2026-09-20 |
| [Introduces Jev's typed-decision API](https://docs.typesafe.ai/introduction) | The official introduction explains sending state and typed questions to Jev and receiving structured answers usable directly in code. | official | — | 2026-09-20 |
| [Defines System One typed-decision models](https://docs.typesafe.ai/concepts/system-one) | Official documentation explains System One models as fast decision systems that evaluate state and return typed answers with probabilities, positioning Jev as the flagship example. | official | — | 2026-09-20 |
| [Explains Jev's typed decisions and practical patterns](https://flaviocopes.com/jev) | A focused deep dive covers typed choices, scores, probabilities, JavaScript examples, practical patterns, use cases, and limitations. | opinion | — | 2026-09-20 |
| [Compared Jev’s role with generative LLMs](https://datacamp.com/blog/system-one-models-jev) | DataCamp argues Jev fits repeated bounded judgments, while chat, code generation, and written explanations remain better suited to LLMs. | opinion | — | 2026-09-16 |
| [Jev fits bounded decisions, not proven frontier replacement](https://kingy.ai/blog/typesafe-jev-review-the-ai-model-that-doesnt-generate-text) | The review favors Jev for high-volume bounded decisions with code-managed escalation, but questions benchmark references and unverified calibration claims. | opinion | — | 2026-09-15 |
| [Launch Jev as a typed-decision API](https://typesafe.ai/blog/introducing-system-one-models-and-jev) | TypeSafe announces Jev early access, describing unstructured state in and typed probabilistic decisions out for automation rather than text generation. | official | — | 2026-09-15 |

### Everything else

*Experiments, oddities and posts that do not fit anywhere yet.* — 22 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Full tutorial for building with Jev](https://youtube.com/watch?v=Nq_lu5QT-fI) | A tutorial video promises practical instruction for using Jev in an implementation, making it more than a launch-summary headline. | code | ▶ 54k | 2026-09-18 |
| [Generate prose by batching Jev next-token choices](https://reddit.com/r/LLM/comments/1winnju/jev_the_new_ai_that_can_only_pick_from_a_list_has) | A demo turns Jev into a text generator by selecting candidate next words, then ranking the resulting sentences. It reports about 1.3 seconds per word and roughly a cent per paragraph. | code | ▲ 73 | 2026-09-17 |
| [Curate an ecosystem directory for Jev](https://github.com/yibie/awesome-jev) | A GitHub repository collecting public Jev projects, integrations, and discussions. It is a distinct community resource rather than a direct Jev integration. | code | ★ 1.6k | 2026-09-17 |
| [Curated Jev use cases, patterns and starter code](https://github.com/Anil-matcha/awesome-jev-by-typesafe) | An evidence-backed awesome list collecting TypeSafe Jev use cases, prompts, patterns and starter implementations. | code | ★ 846 | 2023-05-17 |
| [Curated TypeSafe, System One and Jev project list](https://github.com/AbdelStark/awesome-typesafe) | A GitHub directory collecting official resources and community projects for TypeSafe, System One models and Jev. | code | ★ 513 | 2026-09-17 |
| [Build a source-backed Jev field guide](https://github.com/AbdelStark/awesome-typesafe-jev) | A GitHub repository organizing SDKs, live demos, agent tools, and independent evaluations of TypeSafe's Jev model. | code | ★ 513 | 2026-09-17 |
| [Curated source-backed Jev project directory](https://github.com/cobanov/awesome-jev) | Catalogs public Jev projects, integrations, research, and use cases with source review and implementation caveats. | code | ★ 393 | 2026-09-18 |
| [Evidence-backed index of Jev use cases](https://github.com/walidboulanouar/awesome-jev-use-cases) | Curated list of 74 demos and 150+ Jev-related repositories, including limits, costs, and API examples. | code | ★ 191 | 2026-09-19 |
| [Demonstrates two community projects with Jev](https://youtube.com/watch?v=FQFKZiDOYAM) | A Chinese-language introduction to Jev featuring numerous community examples and two practical demos. | use case | ▶ 15.3k | 2026-09-18 |
| [Curate Jev projects, integrations and resources](https://github.com/MrJev/awesome-jev) | A GitHub repository maintains a curated list of projects, integrations and resources for Jev and TypeSafe AI. | code | ★ 11 | 2026-09-18 |
| [Curates a practical Jev resource list / 整理实用 Jev 资源清单](https://github.com/Li-Evan/awesome-jev) | A usage-first repository collects Jev patterns, recipes, integrations, projects, and a tested cheatsheet. / 一个以使用为先的仓库汇集 Jev 模式、配方、集成、项目和经过测试的速查表。 | code | ★ 5 | 2026-09-21 |
| [Runnable Jev cookbook with 120+ use cases](https://github.com/paramjeetn/jev-cookbook) | A GitHub cookbook containing 120+ Jev use cases, 10 runnable examples, composition patterns, and first-principles theory. | code | ★ 4 | 2026-09-22 |
| [Apply Jev to seven automation decisions](https://vercel.com/i/jev-use-cases) | Vercel documents concrete uses including form routing, ticket prioritization, tool-call review, model selection, document categorization, moderation, and response evaluation. | official | ▲ 2 | 2026-09-22 |
| [Explore a 2D semantic space with Jev](https://semanticspace.dev/) | An interactive project uses Jev to explore semantic relationships in a two-dimensional space. | use case | ▲ 2 | 2026-09-18 |
| [Realtime public wall for yes/no Jev judgments](https://github.com/waynesutton/ask-jev-ai) | A public app sends short questions to Jev for yes, no or depends judgments, displays them in realtime, and tracks cumulative cost toward one million asks. | code | ★ 3 | 2026-09-19 |
| [Publish TypeSafe AI's official website repository](https://github.com/typesafe-ai/typesafe-ai.github.io) | The TypeSafe AI GitHub organization publishes the repository for its official website. | official | ★ 2 | 2026-06-04 |
| [Jev playground with games and sorting experiments](https://github.com/nikhil1raghav/jev-playground) | A collection of toy Jev projects includes a Snake autopilot, Todoist sorter, Hacker News re-ranker and Dangerous Dave autopilot. | code | ★ 1 | 2026-09-22 |
| [JevRadar, a Jev-powered project and post tracker](https://reddit.com/r/Jev/comments/1wlj7of/i_built_a_radar_for_what_people_are_actually) | A continuously refreshed site finds Jev-related projects and posts, then uses Jev to classify builds, novelty, relevance, categories and trends. | code | — | 2026-09-20 |
| [Shows how the creator uses Jev](https://youtube.com/watch?v=UMtP7i-ugW0) | A first-person video covering what Jev is, access, and the creator’s practical usage, though the supplied text gives no task details. | use case | ▶ 1.1k | 2026-09-20 |
| [Bilingual curated directory of Jev projects and resources](https://github.com/majiayu000/awesome-jev) | A curated English and Simplified Chinese list covering Jev projects, SDKs, tutorials and evaluations. | code | ★ 1 | 2026-09-18 |
| [Profiles Diogo Almeida in a founders feature](https://typesafe.ai/blog/diogo-almeida---founders-you-should-know) | An official TypeSafe AI post about founder Diogo Almeida, with no product-specific detail supplied beyond its TypeSafe origin. | official | — | 2026-09-20 |
| [Directory of projects built with Jev](https://madewithjev.com/) | A showcase linking to Jev projects and reporting the speed and cost claimed by each author. | code | — | 2026-09-20 |

### SDKs and clients

*Client libraries and language ports, MCP servers, framework plugins, translated docs.* — 44 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Elixir client for Jev and OpenRouter](https://reddit.com/r/elixir/comments/1wmnxzb/i_built_a_small_elixir_client_for_jev_with) | An early `jev_elixir` client supports TypeSafe and OpenRouter, including yes/no, choice, scoring, and multi-question requests. | code | ▲ 15 | 2026-09-21 |
| [Agent skills for building with TypeSafe's System One API](https://github.com/typesafe-ai/skills) | TypeSafe AI's official skills repository provides agent skills for building with its System One API. | official | ★ 2.1k | 2026-09-12 |
| [MCP connector for direct Jev access](https://github.com/itsmostafa/typesafe-mcp) | An MCP connector gives AI agents direct access to TypeSafe AI’s Jev model for fast, inexpensive evaluations. | code | ★ 302 | 2026-09-17 |
| [Publish the official TypeScript SDK](https://github.com/typesafe-ai/typesafe-sdk-js) | Official TypeScript/JavaScript client library for calling the TypeSafe API. | official | ★ 235 | 2026-09-15 |
| [Release JavaScript SDK 0.6.0 with ordered Score criteria](https://github.com/typesafe-ai/typesafe-sdk-js/releases) | TypeSafe AI’s official JavaScript SDK release changes Score.criteria from an unordered structure to an ordered sequence. | official | ★ 235 | 2026-09-15 |
| [MCP connector for trying Jev from agent clients](https://reddit.com/r/mcp/comments/1wjfjn3/if_you_have_access_to_the_new_typesafe_ai_try) | A thin MCP server lets Claude, Claude Code, Claude Desktop and Codex clients experiment with Jev, supporting TypeSafe and OpenRouter providers. | code | ▲ 13 | 2026-09-18 |
| [Publish the official Python SDK](https://github.com/typesafe-ai/typesafe-sdk-python) | Official Python client library for the TypeSafe API. | official | ★ 223 | 2026-09-18 |
| [Unifies Jev typed decisions with 40 AI providers](https://github.com/juspay/neurolink) | Neurolink exposes one TypeScript interface for generation, streaming, and Jev-backed calibrated decisions, with MCP, voice, RAG, memory, and file-processing features. | code | ★ 140 | 2025-05-31 |
| [Curates Jev resources and runnable examples](https://github.com/AppitStudio/awesome-jev) | An awesome list collecting Jev resources and runnable examples for typed AI decisions. Kept as the representative curated list. | code | ★ 85 | 2026-09-18 |
| [Swift bridge for Jev in Foundation Models](https://github.com/peterfriese/jev-foundation-models) | Provides a native Swift 6 bridge that integrates TypeSafe AI's Jev System One decision model with Apple's Foundation Models framework. | code | ★ 45 | 2026-09-21 |
| [Spring AI integration for TypeSafe Jev](https://github.com/spring-ai-community/spring-ai-typesafe) | Java SDK and Spring AI integrations for the TypeSafe AI Jev API. | code | ★ 37 | 2026-09-20 |
| [CLI for TypeSafe Jev](https://github.com/Nasrallah-AL/jev-cli) | Command-line tool for interacting with TypeSafe's Jev AI model. | code | ★ 21 | 2026-09-18 |
| [Community playground for TypeSafe AI experiments](https://github.com/TypeSafeAI/typesafe-playground) | TypeSafeAI's playground collects 110 use cases, games, dilemmas and model challenges with editable prompts, A/B comparisons and a mobile UI. | official | ★ 21 | 2026-09-16 |
| [Provides a community Go SDK for TypeSafe](https://github.com/captain-corgi/typesafe-sdk-go) | A community-maintained Golang SDK for TypeSafe, providing a language-specific client library for Jev. | code | ★ 8 | 2026-09-20 |
| [Community Java client for TypeSafe API](https://github.com/Premo-Cloud/typesafe-sdk-java) | An unofficial Java client library for the TypeSafe System One API, extending the community SDK ecosystem. | code | ★ 7 | 2026-09-18 |
| [Port TypeSafe’s AI SDK to Elixir with Jev support](https://github.com/nshkrdotcom/typesafe_sdk) | An idiomatic, type-safe Elixir SDK port provides unified model integrations, streaming, structured outputs, tool calling and agent workflows, with Jev as its flagship model. | code | ★ 6 | 2026-09-17 |
| [CLI wrapper for the Jev API](https://github.com/joshLong145/jev-cli) | A command-line tool for interacting with the Jev typed-decision model. | code | ▲ 2 | 2026-09-21 |
| [AI SDK guide for classifying, routing and scoring with Jev](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk) | A focused integration guide shows how to use Jev with Vercel AI SDK for typed classification, routing and scoring. | code | ▲ 2 | 2026-09-19 |
| [AI SDK integration for Jev classification and scoring](https://reddit.com/r/vercel/comments/1wkk4px/how_to_classify_route_and_score_with_jev_and_ai) | Shows how to use Jev with AI SDK's experimental evaluate API through AI Gateway for typed classification, routing, scoring, and verification. | code | ▲ 2 | 2026-09-19 |
| [Community Go SDK for TypeSafe AI](https://github.com/kisshan13/typesafe-ai-go) | Go client for the TypeSafe AI evaluation API with typed questions, fluent builders, retries, and examples. | code | ★ 5 | 2026-09-20 |
| [Chinese translation of the official Jev docs](https://github.com/Bald0Wang/jev-docs-zh) | An unofficial Chinese translation of TypeSafe AI’s official Jev documentation for developers who prefer Simplified Chinese. | code | ★ 5 | 2026-09-20 |
| [Community Java SDK for Jev](https://github.com/jamilxt/typesafe-ai-java) | A community-maintained Java client for the TypeSafe AI System One API, explicitly separate from the official product. | code | ★ 4 | 2026-09-20 |
| [Provide an unofficial C++ TypeSafe SDK](https://github.com/pewriebontal/typesafe-sdk-cpp) | An unofficial C++20 SDK for integrating with the TypeSafe API. | code | ★ 3 | 2026-09-22 |
| [Build a .NET Jev SDK](https://github.com/elbruno/ElBruno.AI.Jev) | A community .NET 10 SDK integrates official Jev typed decisions with Microsoft.Extensions.AI. | code | ★ 3 | 2026-09-22 |
| [.NET client SDK for TypeSafe AI](https://github.com/hardkoded/typesafe-sdk-dotnet) | An unofficial .NET port of the TypeSafe AI client SDK supporting typed questions and answers. | code | ★ 3 | 2026-09-20 |
| [Unofficial Java SDK with Spring Boot support](https://github.com/gudcks0305/jev-java) | Java SDK for Jev and Vercel AI Gateway, including Spring Boot and WebClient integrations. | code | ★ 3 | 2026-09-19 |
| [PHP and Laravel client for Jev](https://github.com/binnash/typesafe-sdk) | Community SDK implementing Jev calls, typed questions, retries, Laravel integration, and tests for routing, thresholds, ranking, and side effects. | code | ★ 3 | 2026-09-17 |
| [Community workflow node for typed Jev decisions](https://reddit.com/r/founder/comments/1wlqnb7/i_built_a_community_node_for_jev_typesafe_ai) | A community node wraps Jev for Choice, Score and Noul operations, batching questions and exposing normalized decisions, probabilities, confidence, latency and token usage. | code | ▲ 1 | 2026-09-20 |
| [Curates Jev projects with Jev-reviewed GitHub submissions](https://reddit.com/r/typesafe_jev/comments/1wjl4sd/i_built_a_directory_where_jev_reviews_submissions) | awesome-jev lists Jev projects, while jev-review-action checks pull requests for integration evidence and posts typed judgments, evidence links, and category suggestions. | code | ▲ 1 | 2026-09-18 |
| [Jev documentation extracted as Markdown](https://github.com/thiagoadril/typesafe-docs) | A repository containing TypeSafe AI and Jev documentation in Markdown format for LLM use and training. | code | ★ 2 | 2026-09-20 |
| [Curated list of Jev resources](https://github.com/robokrunch/awesome-jev) | A curated directory of resources for Jev and TypeSafe AI's System One model. | code | ★ 2 | 2026-09-19 |
| [Adds Jev models to RubyLLM providers](https://github.com/javiergradiche/ruby_llm-providers-typesafe) | A RubyLLM provider integrating TypeSafe System One models for typed judgments, evaluations, and reranking. | code | ★ 2 | 2026-09-18 |
| [.NET SDK for TypeSafe AI](https://reddit.com/r/dotnet/comments/1wlp12g/net_devs_should_also_join_the_jev_hype) | Community NuGet SDK exposing Jev’s System One API, with typed Choice and Noul question helpers and a working C# example. | code | — | 2026-09-20 |
| [Ruby client for TypeSafe Jev](https://github.com/dtheofr/typesafe-jev-ruby) | Dependency-free Ruby client supporting typed questions and probabilistic answers from Jev. | code | ★ 1 | 2026-09-20 |
| [Java 21 SDK for TypeSafe AI](https://github.com/galitianu/jev4j) | Java client library for the TypeSafe AI API, supporting typed questions and typed answers. | code | ★ 1 | 2026-09-20 |
| [Dependency-free MCP server for Jev](https://github.com/CodeIA-Academy/jev-mcp) | Local MCP server exposing Jev to Claude Code, Codex, Hermes and other agents through ask_jev and list_jev_models tools. | code | ★ 1 | 2026-09-20 |
| [Spring AI MCP server for Jev](https://reddit.com/r/mcp/comments/1wlmit4/jevmcpspring_an_mcp_server_for_typesafe_jev_built) | Community Java MCP server exposing Jev classify, score, check and health tools over Streamable HTTP/SSE. | code | — | 2026-09-20 |
| [Unofficial Ruby SDK for Jev](https://github.com/afurm/typesafe-sdk-ruby) | A community Ruby port of the TypeSafe JavaScript SDK supporting typed questions, retries, and typed errors for Jev. | code | ★ 1 | 2026-09-20 |
| [Go SDK for TypeSafe AI](https://github.com/guchengod/typesafe-sdk-go) | A Go SDK exposing TypeSafe AI classification and rating primitives over text and JSON. | code | ★ 1 | 2026-09-19 |
| [Jev SDK developer guide](https://jevtypesafe.org/docs/jev-sdk) | TypeSafe AI documents API-key setup, Choice, Score and Noul primitives, pricing, and copy-paste Node.js and Python examples for calling Jev. | official | — | 2026-09-23 |
| [Publishes the TypeSafe AI Python quick start](https://docs.typesafe.ai/introduction/quickstart) | Official documentation covers SDK installation and the default jev-latest client setup, providing a concrete entry point for using Jev. | official | — | 2026-09-20 |
| [Publishes JavaScript and TypeScript SDK changelog](https://docs.typesafe.ai/sdk/javascript/changelog) | The official changelog records the initial public JavaScript and TypeScript SDK release and a subsequent Score.criteria compatibility change. | official | — | 2026-09-20 |
| [Adds typed response models and SDK fixes in Python v0.7.0](https://docs.typesafe.ai/sdk/python/changelog) | The Python SDK changelog adds a response_model argument for Pydantic type safety, changes serialization, and documents earlier releases and fixes. | official | — | 2026-09-20 |
| [Documents Jev's shared System One endpoint](https://docs.typesafe.ai/models) | Official model documentation states that Jev is served through POST /v1/systemone and that the model field selects the model handling each request. | official | — | 2026-09-20 |

### Editor, OS and app integrations

*Jev wired into editors, Home Assistant, voice control, browsers and coding-agent permission gates.* — 22 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [CUA-S1 System One model for computer use](https://github.com/trycua/cua) | An open repository presents CUA-S1, a System One-style model aimed at computer-use tasks. | code | ▲ 90 | 2026-09-19 |
| [macOS computer-use loop with OCR and Jev](https://github.com/awlevin/typesafe-computer-use) | An open-source macOS automation loop uses OCR, Jev action selection and confidence gates, reserving a writing model for text fields. | code | ★ 954 | 2026-09-16 |
| [Mac voice and browser-control integration for Jev](https://github.com/timpratim/macbrow) | Macbrow is a runnable open-source macOS tool where Jev selects tools and typed arguments in roughly 300 ms, reserving an LLM for text generation. | code | ★ 148 | 2026-09-18 |
| [Browser automation library, CLI and MCP server using Jev](https://github.com/Ying-Kai-Liao/jev-browser) | Combines LLM planning with Jev decisions for browser automation, and ships as a library, CLI and MCP server. | code | ★ 85 | 2026-09-16 |
| [Evidence-gated coding-agent completion](https://github.com/qkal/Canny) | Canny uses deterministic hooks and Jev to prevent coding agents from claiming completion without evidence, with an append-only ledger and no runtime dependencies. | code | ★ 85 | 2026-09-11 |
| [Sort Gmail inboxes with Jevmail](https://github.com/fazlerocks/jevmail) | An open-source local Gmail client uses Jev via Vercel AI Gateway to assign inbox trays, urgency, and human-sent likelihood with read-only Gmail access. | code | ★ 76 | 2026-09-20 |
| [Python skill for scoring job-site pages with Jev](https://github.com/hqman/JevScout) | JevScout drives visible Chrome over CDP and uses Jev to score links and job pages instead of letting the host LLM choose clicks. | code | ★ 35 | 2026-09-18 |
| [SillyTavern extension for Jev-driven automations](https://reddit.com/r/SillyTavernAI/comments/1wmoluu/jeved_04_evolving_roleplay_quality) | Jeved is a SillyTavern extension exposing building blocks for LLM automations through decision-model APIs, with added functionality for sensors, rules, and user-created playgrounds. | code | ▲ 68 | 2026-09-21 |
| [Hide AI-generated social posts with Jev scoring](https://github.com/adamnroman/slop-filter) | Chrome extension that uses Jev to score and hide AI-generated posts and comments on X, LinkedIn, and Reddit. | code | ★ 20 | 2026-09-20 |
| [Pi extensions for Jev routing and context compaction](https://github.com/iefnaf/pi-jev) | A Pi extension suite uses Jev for selective context compaction and model routing, supporting TypeSafe and OpenRouter transports. | code | ★ 9 | 2026-09-18 |
| [Kotlin SDK for Jev-powered Android automation](https://github.com/dougsong/jev-android) | Provides a Kotlin Android SDK for UI automation using Jev, including an accessibility runtime and sample app. | code | ★ 5 | 2026-09-20 |
| [Expose Jev through Workers AI](https://reddit.com/r/CloudFlare/comments/1wmjsj2/typesafes_jev_the_decisiononly_model_is_on) | A Cloudflare Workers AI integration makes TypeSafe's Jev model available as `typesafe/jev`, returning parallel typed decisions for routing, moderation and triage. | code | ▲ 24 | 2026-09-21 |
| [Guard macOS computer use with Jev](https://github.com/Sur-Cai/macos-computer-use-kit) | An AX-first macOS computer-use kit adds optional Jev semantic guards, accessibility targeting, scoped input, clipboard-safe paste, and read-back verification. | code | ★ 4 | 2026-09-22 |
| [Ego Lite browser driver using Jev](https://github.com/jiangkoumo/ego-jev) | Drives the Ego Lite browser by turning an indexed element table into one operation and target; the author reports roughly 2× faster execution than per-step LLM loops. | code | ★ 4 | 2026-09-19 |
| [Voice-controls macOS through Jev typed decisions](https://github.com/chris-wozniczek/jev-voice-control) | A Swift menu-bar app converts speech into Jev decisions and then executes corresponding macOS actions. | code | ★ 4 | 2026-09-18 |
| [Bridge Jev decisions to AI tools](https://github.com/RevocGG/typesafe-jev-bridge) | A zero-dependency OpenAI-compatible CLI and HTTP bridge exposes typed Jev judgments to 9Router, Claude Code, Cursor, Cline, and other OpenAI SDK clients. | code | ★ 3 | 2026-09-20 |
| [Browser-driving skill for Claude Code and Codex](https://github.com/zurfyx/jev-browser-skill) | A plug-and-play skill that lets Jev drive browser interactions through Claude Code and Codex. | code | ★ 3 | 2026-09-19 |
| [Automate browsers with Jev decisions](https://github.com/0x7067/jev-browse) | A browser-automation project using Jev as the decision model for automated browsing tasks. | code | ★ 3 | 2026-09-18 |
| [Claude Code tool-call firewall powered by Jev](https://github.com/RiskAverseTech/toolgate) | Open-source auto mode for AI agents that uses Jev to calibrate and gate tool calls, shipped as a Claude Code hook. | code | ★ 2 | 2026-09-18 |
| [Route Pointer IDE tool calls with Jev](https://reddit.com/r/dev_venezuela/comments/1wlv289/me_canse_de_pagar_por_cursor_ahora_bloqueado_en) | A Rust/Tauri IDE uses Jev to make agent tool-call decisions, aiming to reduce token and context usage while supporting user-supplied model keys. | use case | ▲ 18 | 2026-09-20 |
| [Next.js showcase for Jev judgments](https://github.com/Ashadeepa/typesafe-showcase) | A deployable Next.js UI demonstrates parallel Noul judgments and a Choice-based citation checker. | code | ★ 1 | 2026-09-19 |
| [Speed up browser agents with Jev decisions](https://youtube.com/watch?v=NFKHLhAvj1g) | A video explaining how TypeSafe AI's Jev is used to make browser agents faster. | use case | ▶ 3.9k | 2026-09-18 |

### Open imitations and local models

*Small open models and LLM-backed adapters that reproduce the typed-decision interface without the API.* — 18 entries

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Provide an LLM-backed TypeSafeClient adapter](https://github.com/typesafe-ai/system-one-adapter-python) | Official Python adapter providing a drop-in TypeSafeClient replacement backed by LLM APIs. | official | ★ 294 | 2026-09-18 |
| [Open-source 421M-parameter Jev-style decision model](https://reddit.com/r/LocalLLaMA/comments/1wjieap/made_the_horizontal_opensource_model_for_jev_with) | Laya is an open-source Jev-style model with a ModernBERT encoder, typed decision head, human-annotated data, RLCD training, benchmarks, and a roughly 35 ms forward pass. | code | ▲ 936 | 2026-09-18 |
| [CPU-runnable 395M Jev-compatible model](https://reddit.com/r/LocalLLaMA/comments/1wkpxn6/von_opensource_395m_system_one_model) | Von is an open-source drop-in Jev replacement that runs on 1–2 GB of CPU memory, responds in 25–300 ms and claims to beat Jev on benchmarks. | code | ▲ 192 | 2026-09-19 |
| [Open-weight multilingual Jev-style decision models](https://reddit.com/r/LocalLLaMA/comments/1wm0cn0/convaiinnovationslaya_multilingual) | Laya is an Apache-2.0 local alternative with English and multilingual checkpoints, typed decisions, routing, calibrated probabilities, and human-escalation support. | code | ▲ 29 | 2026-09-21 |
| [Turn local LLMs into Jev-style decision engines](https://reddit.com/r/LLMDevs/comments/1wn45oq/notjev_turn_any_local_llm_into_a_jevstyle) | notjev uses one-token logprobs from OpenAI-compatible local models to return Jev-like verdicts, probabilities, margins, abstention, and the System One wire contract. | code | ▲ 24 | 2026-09-22 |
| [Builds a 151M ModernBERT Jev-compatible decision engine](https://github.com/Heman10x-NGU/Verdict-open-jev) | An open-source non-autoregressive decision engine with calibrated uncertainty, a Jev benchmark audit, and an in-browser WebGPU playground. | code | ★ 101 | 2026-09-17 |
| [Train a local Jev-compatible proxy](https://reddit.com/r/LocalLLaMA/comments/1wnt7kv/stuntd_a_local_jevcompatible_server_on_laya_that) | stuntd records hosted Jev decisions, trains a small local head on Laya, and switches to local inference after meeting an agreement threshold while retaining provider fallback. | code | ▲ 23 | 2026-09-23 |
| [Kev local Jev-compatible decision model family](https://reddit.com/r/LocalLLaMA/comments/1wmxx9w/kev_tiny_jevlike_decision_models_08b4b9b_on) | Open Apache-2.0 models at 0.8B, 4B, and 9B sizes, with training code, frozen evals, local 32GB Mac support, and API compatibility with TypeSafe's SDK. | code | ▲ 13 | 2026-09-22 |
| [Provide a local deterministic Jev-compatible model](https://github.com/emnlmn/snap) | The snap repository provides typed decisions from unstructured state in one forward pass with no generated text. It is local, deterministic, and explicitly Jev-compatible, but unaffiliated with TypeSafe AI. | code | ★ 20 | 2026-09-23 |
| [Open 4B local model matching Jev’s typed interface](https://reddit.com/r/LocalLLM/comments/1wllp1l/a_local_alternative_to_jev_i_trained_zico_an_open) | zico is an open Qwen3.5-4B fine-tune with a compatible server, calibrated Choice, Score and Noul outputs, image support, and MLX/CUDA execution. | code | ▲ 3 | 2026-09-20 |
| [Open-source Qwen alternative to Jev](https://huggingface.co/spaces/drinkmoonshine/parallel-constrained-decoding) | A Hugging Face project offers a Qwen-2.5-1B RLCD-based open alternative intended to reproduce Jev-style typed decisions. | code | ▲ 2 | 2026-09-16 |
| [Local Qwen adapter for Jev-style typed decisions](https://reddit.com/r/LocalLLM/comments/1wlr8sp/i_rebuilt_the_jev_interface_with_local_qwen) | Reimplements Jev's state-plus-questions contract with MLX Qwen models, reading probabilities from logits and reporting accuracy and calibration results. | code | ▲ 1 | 2026-09-20 |
| [Open local Jev-style decision layer with calibration](https://reddit.com/r/learnmachinelearning/comments/1wksf4i/poorjev_an_open_local_system_one_decision_layer) | Poorjev recreates Jev’s Choice, Score and Noul interface locally, reporting ECE improvement from 0.170 to 0.071 on a 55-item held-out evaluation. | code | ▲ 1 | 2026-09-19 |
| [Generate text from Jev decisions](https://github.com/Code-Forge-AU/jev-llm) | An open-source experiment uses Jev choice calls for word-by-word generation, selecting and reranking candidates without a drafting LLM. | code | ★ 4 | 2026-09-17 |
| [Open-weight Jev-compatible System One model](https://github.com/GitHub30/OpenJev) | An open-weight model implements calibrated Noul, Choice and Score decisions in one forward pass and aims to work with the TypeSafe SDK unchanged. | code | ★ 1 | 2026-09-20 |
| [Zico open local model for Jev-style decisions](https://reddit.com/r/SideProject/comments/1wllny3/jev_launched_as_a_closed_api_last_week_so_i) | An open Hugging Face model reproduces Jev’s Choice, Score, and Noul interface locally, adds image inputs, and reports laptop and GPU latency. | code | — | 2026-09-20 |
| [Tested local models as Jev replacements on an M1](https://reddit.com/r/LocalLLM/comments/1wlj1u1/is_it_possible_to_replace_jev_with_local_model_on) | The author found 1.5B and 3B local models unreliable or narrow, while a 27B model judged better but took 20–50 seconds per decision and caused heavy swapping. | opinion | — | 2026-09-20 |
| [Runs a Jev-inspired typed-decision model in WebGPU](https://reddit.com/r/webgpu/comments/1wjzxbj/what_i_learned_running_a_350m_typeddecision_model) | Decision Lab assembles typed JSON from locally scored fields. It reports 92–148 ms warm latency while documenting cold-start, shader compatibility and field-consistency limits. | code | — | 2026-09-18 |

## New and unproven

47 GitHub repositories that nobody has starred yet. They are kept apart from the list above and kept in the index anyway: unproven is not the same as bad, and a repository published yesterday has had no chance to be either. They graduate automatically on their first star.

<details>
<summary>Show the unproven list</summary>

| What | What it does | Kind | Signal | Date |
| --- | --- | --- | --- | --- |
| [Website brand and AEO auditor using Jev](https://github.com/tjkimcloud/jev-site-auditor) | A site-auditing tool combines regex checks with Jev semantic judgments to score pages against custom brand and AEO rules. | code | — | 2026-09-22 |
| [Function mock decorator delegating judgments to Jev](https://github.com/ma2saka/jevmock01) | A Japanese project that provides a function-mocking decorator for delegating decisions to Jev's typed judgment engine. | code | — | 2026-09-22 |
| [Systematic-review screening benchmark with Jev](https://github.com/dm8000/Metapicker) | A benchmark compares Jev with DeepSeek V4 Flash and Qwen3-Reranker for screening systematic-review papers against documented author judgments. | code | — | 2026-09-22 |
| [CSV-driven Jev GTM qualification launcher](https://github.com/iamachilles/jev-gtm) | A dependency-free GTM tool provides seven ready-made Jev questions for list qualification, deduplication, audience signals and title sweeps, launched from CSV. | code | — | 2026-09-22 |
| [Jev reflex layer for browser and mobile automation](https://github.com/JackLee992/jev-reflex-automation) | A repository for Jev-driven fan-out decisions across Chrome, Android and iOS, including canvas digitisation for games and measurements on real devices. | code | — | 2026-09-22 |
| [Go SDK for TypeSafe typed judgments](https://github.com/peach-zhang/typesafe-go) | A Go SDK for TypeSafe System One, exposing typed judgments and probabilities for workflow control. | code | — | 2026-09-21 |
| [Pangram-style Jev benchmark on 7,139 texts](https://github.com/sksq96/jevgram) | Tests whether Jev can reproduce Pangram-like detection across 7,139 RAID, HC3 and MAGE texts, using one typed question per text for $0.97. | code | — | 2026-09-21 |
| [DeepSeek Harness plugin for batch Jev judgments](https://github.com/RaulLazaro/dsh-jev) | A DeepSeek Harness integration for asking Jev typed questions, batching judgments and returning probabilities, with per-user settings. | code | — | 2026-09-21 |
| [Filter LinkedIn AI slop with Jev](https://github.com/fatsopanda-v3/jev-linkedin-slop) | A Chrome extension uses Jev 1.13 as a structured decision model to identify AI-generated or low-quality content in LinkedIn feeds. | code | — | 2026-09-21 |
| [Play 2048 with Jev](https://github.com/tatsuo48/jev-poc) | A Go CLI and Cloudflare Workers web demo uses Jev to make decisions while playing 2048. | use case | — | 2026-09-21 |
| [Scores stock buy and sell decisions](https://github.com/0xZee/jev-stock-decision-maker) | A live demo combines market data and a 20-question Jev assessment to score conviction, financial health, and risk. | use case | — | 2026-09-21 |
| [Controls a claw machine by voice](https://github.com/deemkeen/jevgeni) | JevGeni combines Jev decisions with Whisper v3 Turbo through Groq in a voice-only claw-machine demo. | use case | — | 2026-09-21 |
| [Triages inbox messages with Jev](https://github.com/alseif0x/jev-inbox-triage) | Two-phase inbox triage uses Jev as a typed prefilter, confidence gating, and a pre-send guard. | use case | — | 2026-09-21 |
| [Delegates coding tasks with deterministic escalation / 以确定性升级机制委派编码任务](https://github.com/heliowap/delegador) | A coding delegator chooses models per task, uses deterministic permissions, verifies with real tests, and escalates only after proven failure; Jev handles semantic judgment. / 一个编码委派器按任务选择模型、采用确定性权限、通过真实测试验证，并仅在证实失败后升级；Jev 负责语义判断。 | code | — | 2026-09-21 |
| [Researches shared-axis divination comparisons / 研究共享轴占卜比较](https://github.com/mori-ikuri/jev-divination-lab) | A lab investigates comparing independent divination readings on shared axes with Jev. / 一个实验室研究如何使用 Jev 在共享轴上比较独立的占卜读数。 | code | — | 2026-09-21 |
| [Builds an 8-bit computer from Jev / 用 Jev 构建 8 位计算机](https://github.com/RiwRiwara/jev-computer) | A hardware experiment implements an 8-bit computer using 2,102 NAND gates generated from one Jev yes/no decision. / 一个硬件实验用一次 Jev 是非决策生成由 2,102 个 NAND 门组成的 8 位计算机。 | code | — | 2026-09-21 |
| [Answers document questions with Jev](https://github.com/Manta-Boardgame/jev-chat) | A Windows and Android app uses Jev through Vercel AI Gateway to answer questions about books and office documents, with probabilities, whole-document reading, and on-device OCR. | code | — | 2026-09-21 |
| [Paper-trades crypto perpetuals with Jev](https://github.com/original0211/jev-perp-paper-trader) | A simulation dashboard routes crypto perpetual trading decisions through Jev. It supports paper trading only and does not execute real orders. | code | — | 2026-09-21 |
| [Provides an unofficial Elixir SDK](https://github.com/Studio-Sasquatch/typesafe-sdk-elixir) | Community Elixir SDK for accessing the TypeSafe AI API and Jev typed decisions. | code | — | 2026-09-20 |
| [Semantic code linting experiment with Jev](https://github.com/schalkneethling/jev-lint) | An experimental linter that uses Jev from TypeSafe AI for semantic code analysis. | code | — | 2026-09-20 |
| [Pre-registered independent evaluation of Jev](https://github.com/priorbench/jev) | A repository containing a 5,721-call, 21-experiment independent evaluation, with 50 predictions registered before data collection and raw data included. | code | — | 2026-09-20 |
| [Hermes Agent plugin for Jev decisions](https://github.com/Mrribvar/hermes-jev-plugin) | A Hermes Agent plugin exposing Jev through Vercel AI Gateway for structured decisions, classification and routing. | code | — | 2026-09-20 |
| [Camera-based food allergen estimator with Jev](https://github.com/daisuke7/jevlergy) | A Flutter iOS/Android project evaluates Jev for estimating food allergens from camera input. | code | — | 2026-09-20 |
| [Grok Bot decision router built on Jev](https://github.com/colinmcdermott/grok-jev-router) | Routes decisions through Jev while Grok Bot executes; humans retain control of irreversible actions. | code | — | 2026-09-20 |
| [Haskell library for Jev](https://github.com/realbogart/jev) | A Haskell library for using TypeSafe AI's Jev model. | code | — | 2026-09-20 |
| [Rust Jev client with WASI transports](https://github.com/luizribeiro/jevrs) | A Rust client for Jev featuring a sans-IO core, typed questions, and WASI transport support. | code | — | 2026-09-20 |
| [Rust SDK for TypeSafe AI](https://github.com/tanishqnalloju/typesafe-rust-sdk) | A Rust SDK repository for TypeSafe AI's System One/Jev typed-decision API; it describes itself as official. | code | — | 2026-09-20 |
| [Unofficial Dart SDK for TypeSafe AI](https://github.com/RomainFranceschini/typesafe_ai_sdk) | A community Dart package providing an SDK for the TypeSafe AI API. | code | — | 2026-09-20 |
| [Local Jev-compatible decisions with rules or Laya](https://github.com/Sharkelot/jev-laya-free) | Provides a free local implementation of Jev-compatible typed decisions, with a TypeSafe SDK-compatible Python surface and deterministic Hermes/Qwen guards. | code | — | 2026-09-20 |
| [X content-filtering userscript with Jev](https://github.com/michelbrigante46-art/Twitter-keyword-shield) | Userscript combines local rules with Jev semantic decisions to block spam and hidden promotions on X, targeting sub-100ms latency. | code | — | 2026-09-20 |
| [OMP plugin for Jev-driven coding decisions](https://github.com/hoaphm/jev-decision-maker) | An OMP plugin lets Jev choose the next coding step from candidates supplied by an agent. | code | — | 2026-09-20 |
| [CDC heart-risk benchmark for Jev](https://github.com/rubinagentagi-tech/jev-heart-risk-bench) | Benchmarks Jev on 5,000 real CDC survey respondents and includes an interactive demo with model answers for each profile. | code | — | 2026-09-20 |
| [Crypto screening tool with Jev news judgments](https://github.com/yasdelayu/jev-crypto-scout) | A crypto scout combines coded CoinGecko quant signals with Jev judgments for sentiment, catalysts and confirmation; it is explicitly not a trading bot. | code | — | 2026-09-20 |
| [Adds Jev intent routing to Home Assistant](https://github.com/allenporter/home-assistant-typesafe) | This integration connects Home Assistant conversations to the Jev API for structured intent routing and device control. | code | — | 2026-09-20 |
| [Compare cloud Jev with local decision models / 对比云端 Jev 与本地决策模型](https://github.com/hulryung/jev-testbed) | A testbed runs Jev and self-hosted jeff/GLiFormer examples, reporting measured results for both paths. / 一个测试平台同时运行 Jev 与自托管 jeff/GLiFormer 示例，并报告两种路径的实测结果。 | code | — | 2026-09-19 |
| [Unofficial Jev evaluation app suite](https://github.com/moguone/jev-lab) | A collection of small unofficial applications for evaluating TypeSafe AI’s Jev model. | code | — | 2026-09-19 |
| [Jev resume-screening application](https://github.com/ayushkushwaha609/Jev-resume-screener) | A repository builds a resume screener using TypeSafe AI’s Jev model. | code | — | 2026-09-19 |
| [MCP server exposing Jev to agents](https://github.com/sf-stav/mcp_typesafe) | An MCP server makes TypeSafe’s Jev/System One models available inside agent workflows. | code | — | 2026-09-19 |
| [PHP SDK for TypeSafe AI](https://github.com/sanmai/typesafe-ai-php) | An unofficial PHP client for Jev and the TypeSafe AI API. | code | — | 2026-09-19 |
| [Deterministic Jev decision runtime and calibrator](https://github.com/seb4ez/jevguard) | Adds deterministic decision execution, zero-token caching, and certainty calibration around Jev. | code | — | 2026-09-19 |
| [Repository-rule code review with Jev](https://github.com/jpowersdev/neuralint) | An AI code-review tool checks repositories against their own rules using TypeSafe AI's Jev. | code | — | 2026-09-19 |
| [Jev demo collection via Vercel AI Gateway](https://github.com/az9713/jev-projects) | A repository of Jev demos including a wiki race, town of agents and bullet chess. | code | — | 2026-09-19 |
| [TypeSafe AI API repository](https://github.com/api-evangelist/typesafe-ai) | A repository documenting TypeSafe AI, Jev, the System One endpoint, and its typed decision interface. | official | — | 2026-09-19 |
| [Jev-powered LLM cost-routing layer](https://github.com/lorensation/llm-cost-optimizer-jev) | A routing layer analyzes request complexity, selects the cheapest capable LLM, and validates whether its routing decisions are correct. | code | — | 2026-09-18 |
| [FHIR scenario evaluator pairing Jev with Claude](https://github.com/si618/explore-typesafe-ai) | Evaluates Jev as System One on synthetic FHIR clinical scenarios, with Claude serving as System Two. | code | — | 2026-09-18 |
| [Scala SDK for TypeSafe AI](https://github.com/aoprisan/typesafe-ai-scala-sdk) | A community Scala client for interacting with TypeSafe AI and Jev. | code | — | 2026-09-17 |
| [NetSuite territory-intelligence app using Jev](https://github.com/armansra-hub/stanley) | A Next.js/Supabase/Vercel app uses Jev to interpret company evidence and guide account research, while Claude handles chat and cited stories. | code | — | 2026-06-25 |

</details>

## How this list is built

**Where the entries come from.** A scanner runs daily across GitHub, Reddit, Hacker News, YouTube, TypeSafe AI's own pages and the open web, and proposes candidates. Every entry is then filed by category and given a one-or-two-sentence summary. **The summaries are original** — written for this index, never copied from the project's own README or post.

**What gets in.** Something you can run, a first-hand report of a job actually done, a benchmark with numbers, an official release, or criticism with an argument behind it.

**What stays out.** Reposted news, "what is Jev" explainers with nothing behind them, reaction videos, and anything whose only claim is that Jev exists. A repository with no stars is not rejected — it goes to [New and unproven](#new-and-unproven).

**The site and this list are not the same set.** The [live tracker](https://jessie.romeos.cc/full/apps/jev-tracker) shows every candidate the scan has found — currently more than the 257 listed here — because it is the raw feed. This list is the filtered one: after the first import, a new entry has to clear a bar before it is added (3+ GitHub stars, 10+ forum points, 1000+ video views; TypeSafe AI's own releases always, and an article on a formed judgment). So the site answers "what is out there", and this list answers "what has anyone else noticed".

**What is automated and what is not.** The long tables are maintained automatically: numbers are re-read from the GitHub API daily, and the README is regenerated from the data. [Ten worth opening first](#ten-worth-opening-first) is chosen by hand, the reasons are written by hand, and every incoming pull request is reviewed by a person. Nothing merges itself.

**How the ordering works.** Within a table, entries are ranked against others *measured the same way* — a repository against repositories, a Reddit thread against Reddit threads — and those ranks are what get compared. Mixing a star count with a view count in one sort would invent a comparison that does not exist.

**What this is not.** Not exhaustive, not affiliated with TypeSafe AI, and not an endorsement of anything listed. A link here means someone did something with Jev and left a record of it.

## Contributing

Pull requests are welcome, and they should **edit [`data/entries.json`](data/entries.json), never `README.md`** — the README is generated and your changes to it will be overwritten on the next build.

```bash
# add or edit an entry in data/entries.json, then:
node scripts/validate.mjs      # schema, duplicate links, broken curated ids
node scripts/build-readme.mjs  # regenerate README.md
node scripts/check-links.mjs   # optional, slow: every link
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the entry format and the bar an entry has to clear. Corrections are as welcome as additions — if a summary here misrepresents your project, open a PR or an issue and it will be fixed.

## License

- **Data** (`data/`) — [CC0 1.0](LICENSE-DATA). Public domain. Take it and build whatever you want.
- **Scripts** (`scripts/`) — [MIT](LICENSE).
- Linked projects belong to their authors under their own licenses.

<sub>Generated from `data/entries.json` on 2026-09-25 · [how this is built](#how-this-list-is-built)</sub>
