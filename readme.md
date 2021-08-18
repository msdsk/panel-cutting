# Panel cutting

This should process `.xlsx` files from the `/input` folder into `.csv` in `/output` with informations of what lengths panels should be cut into.

To install, run `npm install`, to run the program use `node panels.js`. Alternatively, for windows, you can use the `.bat` files.

## Input format

Input should be formatted as a simple table with no headers.


|                     |                       |
|---------------------|-----------------------|
| Panel type [String] | Panel length [Number] |



**For example:**

|       |      |
|-------|------|
| 200mm | 100  |
| 200mm | 490  |
| 200mm | 584  |
| 200mm | 646  |
| 200mm | 1300 |
| 200mm | 2400 |
| 300mm | 646  |
| 300mm | 1294 |
| 600mm | 584  |
| 600mm | 646  |
| 600mm | 646  |
| 600mm | 710  |
| 600mm | 710  |
| 600mm | 1294 |
| 600mm | 2040 |
