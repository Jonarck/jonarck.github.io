# Project portfolio · 2026-10-25

The user requested their public GitHub projects, including substantive fork extensions, and excluded ordinary forks. The portfolio now contains six entries: five original public project repositories under Jonarck and one extended fork. Work already presented in Research is not repeated in Projects. The personal website is also excluded, as explicitly clarified by the user.

## Repository decisions

| Repository | Decision | Evidence |
| --- | --- | --- |
| Some-Tiny-Course-Projects-in-SEU | Include as a coursework collection | README lists graphics, planning, knowledge engineering, vision, NLP, embedded systems, and other exercises |
| Some-Tiny-Course-Projects-in-HKUST-GZ | Include as a coursework collection | README lists graduate data-mining, learning, and computing exercises |
| Data-Mining-and-Knowledge-Discovery-in-A_share-News | Include | README and notebooks document filtering, sentiment analysis, and Neo4j |
| MovieLens-Basic-Spark-based-Big-Data-Recommendation-Analysis | Include | Repository description and notebooks document Spark, ALS, feature engineering, and decision trees |
| Reproduction_of_classical_methods-Corporaci-n-Favorita-Grocery-Sales-Forecasting | Include with reproduction attribution | README credits reference solutions and describes the forecasting pipeline |
| jonarck.github.io | Exclude at the user's request | Project source retained as a draft; omitted from the public list and detail routes |
| AI4Sci-MiCaM-EnsembleParadigm1 | Include as an extension, credit MIRALab-USTC | Six commits beyond upstream include motif-mining, preprocessing, model, and experiment changes |
| house_diffusion | Exclude | Default branch identical to Ha0Tang/house_diffusion; zero commits ahead |
| KPGT | Exclude as an independent outcome | Three commits add explanatory comments and reading annotations, rather than a substantive method extension |
| ai_lib | Exclude | Zero commits ahead of upstream |
| Deep-Learning-Papers-Reading-Roadmap | Exclude | Reading-list fork |
| Jonarck | Exclude | GitHub profile repository |
| am4ever | Exclude | Fork of another person's profile README |
| Lee612-1/CAGenMol | Research only | Already presented as a publication with its code link; project source retained as a draft |

The repository inventory was read from GitHub's public API. READMEs, directory listings, and fork comparisons were read through the GitHub connector. Local evidence is saved under `tools/ui-preview/project-expansion/`; the complete public inventory is in `tools/ui-preview/research-reframe/github-repos.json`.

No private repository has been copied into the portfolio. Project pages summarize the public material rather than executing repository code. Coursework collections remain collections rather than presenting every assignment as an independent research project. Project dates use repository creation or documented work dates; no new acceptance or research-result claim was inferred.

## Images

- CAGenMol retains its actual framework figure in Research.
- The excluded website project's local screenshot is retained with its draft source.
- The six published entries use concept illustrations generated with the built-in imagegen tool. They do not depict measured results or working application screenshots.
- [Exact prompts](design-studies/project-cover-prompts.json) and [asset paths, dimensions, and source generation files](design-studies/project-cover-assets.json) are preserved.
- Public image assets are in `public/assets/img/projects/`; generation originals are also copied into the ignored local study folder.

Projects are presented only on the Projects page, which lists all six entries and supports title, description, and tag search. About no longer includes project previews. MiCaM Ensemble is separate from the CamS paper in Research.

The navigation contains About, Research, Projects, and Blog. The standalone CV viewer is removed; About retains the direct CV PDF link, and the old `/cv/` address redirects to About.

## Publication follow-up

The publication list uses equal 3:2 image frames with contained, proportional images. CamS displays only its left panel through a native SVG viewport, including in the enlarged view. One-sentence summaries are removed from the rendered list. ICHEC uses Figure 4 from the user-supplied manuscript; the full manuscript is not published.
