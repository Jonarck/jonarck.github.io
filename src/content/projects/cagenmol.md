---
title: CAGenMol
# Presented in Research; preserve this source without a duplicate project page.
draft: true
date: 2026-04-13
description: Molecular generation under combined structural and property constraints.
role: Co-first author
featured: false
venue: Findings of ACL 2026
tags: [Molecular Design, Molecular Generation, Diffusion Language Models]
image: /assets/img/pubs/CAGenMol.png
image_alt: Overview of the CAGenMol molecular generation framework
code: https://github.com/Lee612-1/CAGenMol
paper: https://aclanthology.org/2026.findings-acl.232/
---

## Overview

CAGenMol explores how to generate molecules while satisfying several constraints at once, including protein–ligand compatibility and drug-like properties.

The model treats molecular design as conditional denoising over molecular sequences. It combines discrete diffusion with reinforcement learning to guide generation toward structural and property objectives, and supports iterative refinement of molecular fragments at inference time.

## Publication

[CAGenMol: Condition-Aware Diffusion Language Model for Goal-Directed Molecular Generation](https://aclanthology.org/2026.findings-acl.232/)

Yanting Li\*, **Zhuoyang Jiang\***, Enyan Dai, Lei Wang, Wen-Cai Ye, Li Liu.

\* Equal contribution. Findings of ACL 2026.
