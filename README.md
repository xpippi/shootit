# :camera_flash: `shootit` ![](https://github.com/xpippi/shootit/workflows/Tests/badge.svg)
> A GitHub Action to capture proofs of a website, across Windows, Mac, and Linux

## Contents
- [Usage](#usage)
- [Inputs](#inputs)
- [Outputs](#outputs)
- [Advanced Usage](#advanced-usage)
- [Credits](#credits)

## Usage

```yaml
- name: Proof Website
  uses: xpippi/shootit@v1.x
  with:
    source: https://github.com/xpippi/shootit
    destination: proof.png
```

## Inputs

### Required inputs

1. `source`: Source of the content to be captured, may be a URL or HTML string, e.g. `https://example.com/`
1. `destination`: Destination filename the captured website will be written to, defaults to `proof.png`

### Optional inputs

```yaml
- name: Proof Website
  uses: xpippi/shootit@v1.x
  with:
    source: https://github.com/xpippi/shootit
    destination: proof.png
    full-page: true
```

## Outputs

An [artifact](https://help.github.com/en/actions/configuring-and-managing-workflows/persisting-workflow-data-using-artifacts) will be created automatically for each proof captured. The following additional outputs are also supported:

1. `path`: The filesystem path to the captured proof

## Advanced Usage

Use a matrix to capture proofs across different operating systems, e.g.

```yaml
jobs:
  proof:
    name: Proof
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}

    steps:

    - name: Proof Website
      uses: xpippi/shootit@v1.x
      with:
        source: https://github.com/xpippi/shootit
        destination: proof-${{ matrix.os }}.png
```

Combine a matrix with additional options such as width, e.g.

```yaml
jobs:
  proof:
    name: Proof
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        width: [1200, 992, 768, 600]
    runs-on: ${{ matrix.os }}

    steps:

    - name: Proof Website
      uses: xpippi/shootit@v1.x
      with:
        source: https://github.com/xpippi/shootit
        destination: proof-${{ matrix.os }}-${{ matrix.width }}.png
        width: ${{ matrix.width }}
```


## Credit card declined