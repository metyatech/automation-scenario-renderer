# Changelog

All notable changes to this repository will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [Unreleased]

### Added

- Added `processArtifacts` function to automate annotation application to images and videos.
- Added optional `outputPath` parameter to `annotateImage` for better control and consistency with `annotateVideo`.
- Added automated integration tests for `annotateImage` and `annotateVideo` using `sharp` and `ffmpeg`.
- Added automated tests for `processArtifacts` function.
- Updated `README.md` with batch processing examples and explicit system requirements.

### Changed

- Updated `AGENTS.md` with the latest global rules from `compose-agentsmd`.

### Fixed

- Improved consistency between image and video annotation APIs.

## [0.2.0] - 2026-03-06

### Added

- New `processArtifacts` batch processing function.
- Enhanced `annotateImage` with `outputPath` support.
- Integration tests for core functional side-effects.

## [0.1.0] - 2026-01-26

### Added

- Initial public workspace setup.
- Local ghws workspace rules and AGENTS.md composition.
