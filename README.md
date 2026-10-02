# @lapxo/topos-frame

![version 0.1.1](https://img.shields.io/badge/version-0.1.1-8c959f) ![license MIT](https://img.shields.io/badge/license-MIT-8c959f) ![node >=22.12](https://img.shields.io/badge/node-%3E%3D22.12-8c959f) ![dependencies 1](https://img.shields.io/badge/dependencies-1-8c959f) ![cases 0 hold](https://img.shields.io/badge/cases-0_hold-8c959f) ![verify agrees](https://img.shields.io/badge/verify-agrees-2da44e)

The shape a capsule keeps.

A world for worlds. Point it at a capsule and each of its laws reads the capsule's own lines and the receipts of its code, and says by receipt whether the shape holds. [its regions, read off its own descriptor](docs/reference.md)

## Why pages are lines

A world is trusted by its shape, not by its author. What a stranger can check in a minute is what the frame asks: short regions, one file per line, helpers written once, effects declared, and nothing a place owns spelled in code.

## One capsule, every law

<p align="center"><img src="docs/img/world.svg" alt="declares , runs on , reaches, 23 regions, the longest of them 0 lines, 0 vector files, each held from the blob, pinned by topos-frame and run by the host" width="640"></p>

## What it claims

- **It holds {laws} laws, each one region with vectors of its own.** · [receipt](receipts.bound)

## Line

Add to your lock:
sources/topos-frame value=github:Lapxo/topos-frame
uses/topos-frame sha256:<release digest>
Fetch the release asset, verify its sha256 equals the uses/ line, place it in bound/cas/blobs/. Fold: its pages appear.
open: line/install needs=host/resolve — when bound resolves sources/ itself, the fetch line leaves the page by fold.

It rests on topos.

## Check

● 0 cases hold

● `tsc --build`

## Pointers

- [Reference](docs/reference.md)
