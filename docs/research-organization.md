# Research organization · 2026-10-25

## Editorial decision

The user's current framing is AI and HCI for creativity and design for humans and built environments. Four core modules organize the research, in this order: Built environment, Physical sciences, Entertainment, and AI & HCI methods. Built environment is the first theme at the user's request. The three application areas use concise domain names because the shared “Core applications” label already describes their role. Related explorations remain a separate supporting module. Authorship is an independent filter.

The motivation letter describes a progression from architecture and urban planning to structured representation learning and back to design-assistive models. The CV explicitly frames the molecular representation work as a methodological foundation. The user's current instruction broadens this design focus to molecular structures, built environments, creativity, interaction, and film. The resulting taxonomy is an editorial synthesis, not a claim that every paper already addresses all these areas.

Local sources: [motivation letter](../public/research_pathway_pdf/1.Motivation_Letter-ZhuoyangJIANG.pdf) and [CV](../public/research_pathway_pdf/2.CV-ZhuoyangJIANG.pdf). Public paper records take precedence over stale titles and author lists in those application documents. Private application details and submission screenshots are not copied into the website.

## Paper decisions

| Paper | Website area | Relationship to design | Contribution |
| --- | --- | --- | --- |
| [Rethinking Floorplan Generation](https://arxiv.org/abs/2602.22507) | Built environments | Architectural theory supplies representations, measurements, and feedback for generation | First |
| [Park-BIND](https://doi.org/10.3390/land15091572) | Built environments | Evaluates concrete boundary-opening interventions, rather than merely predicting mobility | Co-first |
| When Residents Report and Sensors Record | Built environments | Resident and sensor evidence for neighbourhood design; description limited to the title | Co-author |
| [Pocket park site selection](https://doi.org/10.1080/10630732.2024.2402676) | Built environments | Site assessment supports planning decisions | Co-author |
| [CAGenMol](https://aclanthology.org/2026.findings-acl.232/) | Physical sciences | Direct conditional generation of molecular structures | Co-first |
| [CamS](https://arxiv.org/abs/2601.02530) | Physical sciences | Molecular representation and property prediction; grouped by its scientific domain at the user's request | First |
| [Think Before You Act](https://arxiv.org/abs/2606.08122) | Related explorations | Location prediction without a direct design intervention in this paper | Co-author |
| [RationaleTS](https://arxiv.org/abs/2601.02968) | Related explorations | General time-series reasoning, without a direct design task | Co-author |

Counts: 8 papers; 4 Built environment papers, 2 Physical sciences papers, 0 Entertainment papers, 0 AI & HCI methods papers, and 2 Related explorations. Each paper has one primary area.

On 26 October 2026, the user narrowed Selected work and made it the default view. The selected set is now Floorplan and CamS (2 papers). First-author preprints remain eligible. Co-first authorship is eligible only when the user is listed first among the co-first authors; second-listed co-first papers are excluded. Park-BIND is excluded under the user's venue criterion (Land), and CAGenMol is excluded because the user is the second-listed co-first author, even though ACL Findings is eligible under the user's chosen venue scope. All 8 papers remain available under All work. Selection is stored explicitly with `selected: true` in the publication data, rather than inferred from any co-first authorship or from a venue-name keyword. Future additions should follow the user's editorial criteria.

Entertainment and AI & HCI methods remain visible with “Coming soon,” as requested by the user. Their empty state is distinct from a filter returning no selected papers. The user identifies an unpublished project as belonging to AI & HCI methods and requests leaving that module empty for now; no project title, publication claim, or placeholder paper is added publicly.

About presents three plain list items under Research interests: the intersection, the design domains, and the methods, without Applications or Methods labels. On wide screens, About aligns with the combined height of Education and Recent updates; the updates region fills the remaining space and scrolls internally. On narrow screens the three panels stack and updates uses a fixed-height scrolling region. The full timeline supports keyboard scrolling without JavaScript or an expand action.

## Bibliographic corrections and boundaries

- Floorplan paper: use the v3 title and four authors (Zhuoyang Jiang, Dongqing Zhang, Qingxiang Liu, Yuxuan Liang), revised 10 October 2026. Initial preprint date remains 26 February 2026.
- Park-BIND: MDPI explicitly marks Dongqing Zhang and Zhuoyang Jiang as equal contributors. Its correspondence marker belongs to Yi Wan. Published 27 August 2026; Land 15(9), 1572.
- CAGenMol: official ACL Anthology record, Findings of ACL 2026, pp. 4720–4738. The internal sorting date retains the initial April preprint release; the displayed venue is the published version.
- ICHEC 2026: acceptance supplied by the user; author order supplied in the screenshot; the user explicitly confirmed ordinary co-authorship. Figure 4 comes from the subsequently supplied manuscript. No public URL or DOI is available. A year-only date avoids inventing an acceptance day. The entry is not included in Selected work.
- Asterisk on this site consistently denotes equal contribution, even where a publisher uses a dagger. It is not used for correspondence.
- The public CAGenMol-2 record was checked but does not list Zhuoyang Jiang; it was not added.

## Presentation

[CIS Lab's selected-publications page](https://cislab.hkust-gz.edu.cn/publications/tags/selected/) informed the image-left, text-right rhythm, natural figure proportions, and fine dividers. The implementation retains this site's typography, navigation, architectural palette, and translucent controls. No CIS Lab code or branding was copied.

Each paper appears once. Selected work / All work and research-area filters act on that same list. Selected work is active in the initial HTML, avoiding a flash of all papers before JavaScript loads. Native radio controls support keyboard navigation. Without JavaScript, the full list and image links remain available through a noscript fallback. The empty-result reset explicitly selects All work rather than returning to the default selected subset. Authorship badges remain independent of inclusion in Selected work. Figures use consistent 3:2 frames, with proportional fitting inside each frame. The one-sentence paper summaries are no longer displayed. Figures open in an accessible modal with Escape/close controls. Mobile rows stack. Original scientific figure colors are preserved.

All eight papers have source figures. ICHEC uses Figure 4 from the user-supplied manuscript, without publishing the manuscript itself. CamS shows only panel (a), as requested, using an SVG viewport around the original illustration. [Figure provenance](design-studies/publication-figures.json) records original sources and PDF panel coordinates. The floorplan teaser is Figure 1(b), not the outdated SSPT diagram. Park-BIND uses the publisher's Figure 4, showing concrete spatial interventions.

## Preservation and verification

Before this redesign, working source and built preview were saved in `tools/ui-preview/snapshots/before-publication-redesign-2026-10-25/`, with SHA-256 manifest and restore instructions. Restore into a separate directory. Earlier architecture and glass snapshots remain available.

Run `npm run build`, `npm run verify`, and `node tools/ui-preview/verify-selected-work.mjs` against the local preview on port 4180. The selection check covers the two-paper default, all eight papers, independent research-area filters, the empty-result reset, author badges, initial HTML, no-JavaScript fallback, responsive overflow, and the simplified name dialog. Earlier research-redesign screenshots and tests retain the previous four-paper authorship subset.
