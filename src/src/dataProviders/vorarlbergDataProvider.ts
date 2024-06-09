import { MapDataProvider } from 'src/models/MapDataProvider'
import { MapItem } from 'src/models/MapItem'

const mapItems : MapItem[] = [
  {
    name: 'Bartholomäberg',
    points: [{ x: 1310.4, y: 2288.2 }, { x: 1334.39, y: 2331.4 }, { x: 1281.6, y: 2413 }, { x: 1204.8, y: 2456.2 }, { x: 1080, y: 2446.6 }, { x: 1017.6, y: 2369.8 }, { x: 1108.8, y: 2269 }, { x: 1132.8, y: 2264.2 }, { x: 1310.4, y: 2288.2 }]
  }, {
    name: 'Blons',
    points: [{ x: 1032, y: 1721.8 }, { x: 1070.4, y: 1808.2 }, { x: 1051.2, y: 1822.6 }, { x: 921.6, y: 1851.4 }, { x: 892.8, y: 1707.4 }, { x: 931.2, y: 1688.2 }, { x: 998.39, y: 1621 }, { x: 1012.79, y: 1621 }, { x: 1031.99, y: 1721.8 }]
  }, {
    name: 'Bludenz',
    points: [{ x: 1132.8, y: 2053 }, { x: 1209.59, y: 2077 }, { x: 1137.6, y: 2192.2 }, { x: 1132.8, y: 2264.2 }, { x: 1108.8, y: 2269 }, { x: 1075.2, y: 2254.6 }, { x: 1046.4, y: 2225.8 }, { x: 1027.2, y: 2187.4 }, { x: 945.61, y: 2216.2 }, { x: 921.61, y: 2206.6 }, { x: 840.01, y: 2105.8 }, { x: 1008.01, y: 2029 }, { x: 1060.81, y: 2081.8 }, { x: 1132.8, y: 2053 }]
  }, {
    name: 'Bludesch',
    points: [{ x: 696, y: 1990.6 }, { x: 681.6, y: 2024.2 }, { x: 556.8, y: 1933 }, { x: 609.59, y: 1880.2 }, { x: 676.79, y: 1875.4 }, { x: 710.39, y: 1880.2 }, { x: 681.59, y: 1894.6 }, { x: 700.79, y: 1933 }, { x: 657.59, y: 1961.8 }, { x: 700.79, y: 1966.6 }, { x: 652.79, y: 1990.6 }, { x: 695.99, y: 1990.6 }]
  }, {
    name: 'Brand',
    points: [{ x: 715.2, y: 2269 }, { x: 705.6, y: 2413 }, { x: 672, y: 2528.2 }, { x: 523.2, y: 2566.6 }, { x: 432, y: 2528.2 }, { x: 470.4, y: 2355.4 }, { x: 441.6, y: 2307.4 }, { x: 600, y: 2312.2 }, { x: 628.8, y: 2259.4 }, { x: 715.2, y: 2269 }]
  }, {
    name: 'Bürs',
    points: [{ x: 840, y: 2105.8 }, { x: 921.6, y: 2206.6 }, { x: 868.8, y: 2293 }, { x: 878.4, y: 2336.2 }, { x: 796.8, y: 2408.18 }, { x: 705.61, y: 2412.98 }, { x: 715.21, y: 2269 }, { x: 763.2, y: 2216.2 }, { x: 772.8, y: 2101 }, { x: 840, y: 2105.8 }]
  }, {
    name: 'Bürserberg',
    points: [{ x: 772.8, y: 2101 }, { x: 763.2, y: 2216.2 }, { x: 715.2, y: 2269 }, { x: 628.8, y: 2259.4 }, { x: 619.2, y: 2192.2 }, { x: 648, y: 2105.8 }, { x: 681.6, y: 2091.4 }, { x: 772.8, y: 2101 }]
  }, {
    name: 'Dalaas',
    points: [{ x: 1867.2, y: 2168.2 }, { x: 1809.6, y: 2187.4 }, { x: 1728, y: 2158.6 }, { x: 1641.6, y: 2221 }, { x: 1612.8, y: 2278.6 }, { x: 1636.8, y: 2369.8 }, { x: 1598.4, y: 2350.6 }, { x: 1507.22, y: 2389 }, { x: 1334.41, y: 2331.4 }, { x: 1310.42, y: 2288.2 }, { x: 1358.41, y: 2269 }, { x: 1372.81, y: 2201.8 }, { x: 1310.42, y: 2158.6 }, { x: 1296.02, y: 2077 }, { x: 1401.62, y: 2009.8 }, { x: 1502.4, y: 1976.22 }, { x: 1502.4, y: 1918.62 }, { x: 1560, y: 1913.82 }, { x: 1588.8, y: 1976.22 }, { x: 1795.2, y: 1966.62 }, { x: 1761.6, y: 2014.6 }, { x: 1824, y: 2057.8 }, { x: 1867.2, y: 2168.2 }]
  }, {
    name: 'Fontanella',
    points: [{ x: 1377.6, y: 1640 }, { x: 1233.6, y: 1740.8 }, { x: 1204.8, y: 1716.8 }, { x: 1084.8, y: 1774.4 }, { x: 1032, y: 1721.6 }, { x: 1012.8, y: 1620.8 }, { x: 1027.2, y: 1587.2 }, { x: 1147.2, y: 1582.4 }, { x: 1252.8, y: 1539.2 }, { x: 1281.6, y: 1515.2 }, { x: 1300.8, y: 1582.4 }, { x: 1377.59, y: 1592 }, { x: 1377.59, y: 1640 }]
  }, {
    name: 'Gaschurn',
    points: [{ x: 1828.8, y: 2734.6 }, { x: 1795.2, y: 2763.4 }, { x: 1886.4, y: 2845 }, { x: 1900.8, y: 2941 }, { x: 1852.8, y: 2941 }, { x: 1785.6, y: 3128.2 }, { x: 1699.2, y: 3195.4 }, { x: 1723.2, y: 3329.78 }, { x: 1819.2, y: 3430.58 }, { x: 1828.8, y: 3536.18 }, { x: 1704, y: 3574.58 }, { x: 1665.6, y: 3492.98 }, { x: 1555.2, y: 3473.78 }, { x: 1540.8, y: 3406.58 }, { x: 1473.6, y: 3320.18 }, { x: 1363.21, y: 3281.8 }, { x: 1329.61, y: 3224.2 }, { x: 1348.81, y: 3147.4 }, { x: 1310.42, y: 3061 }, { x: 1339.21, y: 3070.6 }, { x: 1416.02, y: 2969.8 }, { x: 1392.01, y: 2912.2 }, { x: 1502.4, y: 2797.02 }, { x: 1632, y: 2744.22 }, { x: 1660.8, y: 2715.42 }, { x: 1828.8, y: 2734.62 }]
  }, {
    name: 'Innerbraz',
    points: [{ x: 1296, y: 2077 }, { x: 1310.4, y: 2158.6 }, { x: 1372.79, y: 2201.8 }, { x: 1358.39, y: 2269 }, { x: 1310.4, y: 2288.2 }, { x: 1132.8, y: 2264.2 }, { x: 1137.6, y: 2192.2 }, { x: 1209.59, y: 2077 }, { x: 1295.99, y: 2077 }]
  }, {
    name: 'Klösterle',
    points: [{ x: 1867.2, y: 2168.2 }, { x: 1982.4, y: 2206.6 }, { x: 2092.78, y: 2168.2 }, { x: 2121.58, y: 2206.6 }, { x: 2063.98, y: 2235.4 }, { x: 2078.38, y: 2283.4 }, { x: 2011.2, y: 2293 }, { x: 2006.4, y: 2336.2 }, { x: 1920, y: 2355.4 }, { x: 1838.4, y: 2513.8 }, { x: 1675.2, y: 2504.2 }, { x: 1689.6, y: 2369.8 }, { x: 1636.8, y: 2369.8 }, { x: 1612.8, y: 2278.6 }, { x: 1641.6, y: 2221 }, { x: 1728, y: 2158.6 }, { x: 1809.6, y: 2187.4 }, { x: 1867.2, y: 2168.2 }]
  }, {
    name: 'Lech',
    points: [{ x: 2064, y: 1812.8 }, { x: 2107.2, y: 1865.6 }, { x: 2107.2, y: 1947.2 }, { x: 2054.4, y: 2004.8 }, { x: 2092.8, y: 2105.6 }, { x: 2092.8, y: 2167.98 }, { x: 1982.4, y: 2206.38 }, { x: 1867.2, y: 2167.98 }, { x: 1824, y: 2057.6 }, { x: 1761.62, y: 2014.4 }, { x: 1795.2, y: 1966.4 }, { x: 1588.82, y: 1976 }, { x: 1560.02, y: 1913.6 }, { x: 1603.22, y: 1832 }, { x: 1656.02, y: 1822.4 }, { x: 1761.6, y: 1841.6 }, { x: 1785.6, y: 1788.8 }, { x: 1843.2, y: 1784 }, { x: 1876.8, y: 1736 }, { x: 2044.8, y: 1779.2 }, { x: 2064, y: 1812.8 }]
  }, {
    name: 'Lorüns',
    points: [{ x: 945.6, y: 2216.2 }, { x: 1046.39, y: 2225.8 }, { x: 1075.19, y: 2254.6 }, { x: 988.79, y: 2293 }, { x: 878.4, y: 2336.2 }, { x: 868.8, y: 2293 }, { x: 921.6, y: 2206.6 }, { x: 945.6, y: 2216.2 }]
  }, {
    name: 'Schnifis',
    points: [{ x: 715.2, y: 1750.4 }, { x: 700.8, y: 1851.2 }, { x: 676.8, y: 1875.2 }, { x: 609.6, y: 1880 }, { x: 561.6, y: 1841.6 }, { x: 566.4, y: 1832 }, { x: 633.6, y: 1808 }, { x: 686.4, y: 1817.6 }, { x: 686.4, y: 1745.6 }, { x: 715.2, y: 1750.4 }]
  }, {
    name: 'Sulz',
    points: [{ x: 456, y: 1486.4 }, { x: 403.2, y: 1534.4 }, { x: 312, y: 1457.6 }, { x: 321.6, y: 1438.4 }, { x: 417.6, y: 1500.8 }, { x: 456, y: 1486.4 }]
  }, {
    name: 'Übersaxen',
    points: [{ x: 508.8, y: 1635.4 }, { x: 600, y: 1688.2 }, { x: 600, y: 1717 }, { x: 566.4, y: 1736.2 }, { x: 528, y: 1688.2 }, { x: 432, y: 1707.4 }, { x: 456, y: 1606.6 }, { x: 508.8, y: 1635.4 }]
  }, {
    name: 'Ludesch',
    points: [{ x: 912, y: 1947.4 }, { x: 753.6, y: 2033.8 }, { x: 700.8, y: 2024.2 }, { x: 681.6, y: 2024.2 }, { x: 696, y: 1990.6 }, { x: 777.6, y: 1918.6 }, { x: 859.19, y: 1865.8 }, { x: 892.79, y: 1865.8 }, { x: 854.39, y: 1918.6 }, { x: 911.99, y: 1947.4 }]
  }, {
    name: 'Nenzing',
    points: [{ x: 441.6, y: 1875.4 }, { x: 556.79, y: 1933 }, { x: 681.59, y: 2024.2 }, { x: 700.79, y: 2024.2 }, { x: 681.59, y: 2091.4 }, { x: 647.99, y: 2105.8 }, { x: 619.19, y: 2192.18 }, { x: 628.79, y: 2259.38 }, { x: 600, y: 2312.18 }, { x: 441.6, y: 2307.38 }, { x: 470.4, y: 2355.38 }, { x: 432, y: 2528.18 }, { x: 336, y: 2528.18 }, { x: 292.8, y: 2566.58 }, { x: 216.01, y: 2518.58 }, { x: 235.21, y: 2441.78 }, { x: 302.4, y: 2422.58 }, { x: 312, y: 2388.98 }, { x: 268.8, y: 2297.78 }, { x: 316.8, y: 2221 }, { x: 278.4, y: 2115.4 }, { x: 350.4, y: 1851.4 }, { x: 374.4, y: 1894.6 }, { x: 369.6, y: 1928.2 }, { x: 417.6, y: 1928.2 }, { x: 393.6, y: 1856.2 }, { x: 374.4, y: 1889.8 }, { x: 345.6, y: 1846.6 }, { x: 403.2, y: 1827.4 }, { x: 441.6, y: 1875.4 }]
  }, {
    name: 'Nüziders',
    points: [{ x: 1132.8, y: 2053 }, { x: 1060.8, y: 2081.8 }, { x: 1008, y: 2029 }, { x: 840, y: 2105.8 }, { x: 772.81, y: 2101 }, { x: 681.61, y: 2091.4 }, { x: 700.81, y: 2024.2 }, { x: 753.61, y: 2033.8 }, { x: 912.01, y: 1947.4 }, { x: 1056.01, y: 1966.6 }, { x: 1132.8, y: 2053 }]
  }, {
    name: 'Raggal',
    points: [{ x: 1401.6, y: 2009.8 }, { x: 1296, y: 2077 }, { x: 1209.6, y: 2077 }, { x: 1132.81, y: 2053 }, { x: 1056.01, y: 1966.6 }, { x: 912.01, y: 1947.4 }, { x: 854.41, y: 1918.6 }, { x: 892.81, y: 1865.82 }, { x: 921.61, y: 1851.42 }, { x: 1051.21, y: 1822.62 }, { x: 1089.61, y: 1885 }, { x: 1267.21, y: 1899.4 }, { x: 1401.6, y: 2009.8 }]
  }, {
    name: 'St. Anton',
    points: [{ x: 1108.8, y: 2269 }, { x: 1017.6, y: 2369.8 }, { x: 988.8, y: 2293 }, { x: 1075.2, y: 2254.6 }, { x: 1108.8, y: 2269 }]
  }, {
    name: 'St. Gallenkirch',
    points: [{ x: 1632, y: 2744.2 }, { x: 1502.4, y: 2797 }, { x: 1392, y: 2912.2 }, { x: 1416, y: 2969.8 }, { x: 1339.2, y: 3070.58 }, { x: 1310.41, y: 3061 }, { x: 1348.8, y: 3147.38 }, { x: 1329.6, y: 3224.18 }, { x: 1204.8, y: 3228.98 }, { x: 1017.61, y: 3123.38 }, { x: 1032.01, y: 3027.4 }, { x: 1008.01, y: 2993.8 }, { x: 1075.21, y: 2883.4 }, { x: 1070.41, y: 2830.6 }, { x: 1128, y: 2696.2 }, { x: 1248, y: 2643.4 }, { x: 1372.8, y: 2571.4 }, { x: 1406.4, y: 2619.4 }, { x: 1440, y: 2609.8 }, { x: 1435.2, y: 2657.8 }, { x: 1603.2, y: 2705.8 }, { x: 1632, y: 2744.2 }]
  }, {
    name: 'St. Gerold',
    points: [{ x: 931.2, y: 1688.2 }, { x: 892.8, y: 1707.4 }, { x: 921.6, y: 1851.4 }, { x: 892.8, y: 1865.8 }, { x: 859.2, y: 1865.8 }, { x: 792, y: 1736.2 }, { x: 844.8, y: 1712.2 }, { x: 792, y: 1659.4 }, { x: 840, y: 1640.2 }, { x: 892.8, y: 1645 }, { x: 931.2, y: 1688.2 }]
  }, {
    name: 'Schruns',
    points: [{ x: 1372.8, y: 2571.4 }, { x: 1248, y: 2643.4 }, { x: 1209.6, y: 2542.6 }, { x: 1080, y: 2446.6 }, { x: 1204.8, y: 2456.2 }, { x: 1281.6, y: 2413 }, { x: 1305.6, y: 2494.6 }, { x: 1358.39, y: 2494.6 }, { x: 1387.19, y: 2547.4 }, { x: 1372.79, y: 2571.4 }]
  }, {
    name: 'Silbertal',
    points: [{ x: 1636.8, y: 2369.8 }, { x: 1689.6, y: 2369.8 }, { x: 1675.2, y: 2504.2 }, { x: 1838.4, y: 2513.8 }, { x: 1838.4, y: 2571.4 }, { x: 1886.4, y: 2585.8 }, { x: 1905.6, y: 2648.2 }, { x: 1828.8, y: 2734.6 }, { x: 1660.8, y: 2715.4 }, { x: 1632, y: 2744.2 }, { x: 1603.2, y: 2705.8 }, { x: 1435.2, y: 2657.8 }, { x: 1440, y: 2609.8 }, { x: 1406.4, y: 2619.4 }, { x: 1372.8, y: 2571.4 }, { x: 1387.2, y: 2547.4 }, { x: 1358.4, y: 2494.6 }, { x: 1305.61, y: 2494.6 }, { x: 1281.61, y: 2413 }, { x: 1334.4, y: 2331.42 }, { x: 1507.2, y: 2389 }, { x: 1598.4, y: 2350.62 }, { x: 1636.8, y: 2369.82 }]
  }, {
    name: 'Sonntag',
    points: [{ x: 1588.8, y: 1716.8 }, { x: 1612.8, y: 1750.4 }, { x: 1675.2, y: 1750.4 }, { x: 1656, y: 1822.4 }, { x: 1603.2, y: 1832 }, { x: 1560, y: 1913.6 }, { x: 1502.4, y: 1918.4 }, { x: 1502.4, y: 1976 }, { x: 1401.6, y: 2009.58 }, { x: 1267.21, y: 1899.2 }, { x: 1089.61, y: 1884.8 }, { x: 1051.21, y: 1822.4 }, { x: 1070.41, y: 1808 }, { x: 1032.01, y: 1721.6 }, { x: 1084.81, y: 1774.4 }, { x: 1204.81, y: 1716.8 }, { x: 1233.61, y: 1740.8 }, { x: 1377.61, y: 1640 }, { x: 1473.6, y: 1620.8 }, { x: 1588.8, y: 1716.8 }]
  }, {
    name: 'Stallehr',
    points: [{ x: 1046.4, y: 2225.8 }, { x: 945.6, y: 2216.2 }, { x: 1027.2, y: 2187.4 }, { x: 1046.4, y: 2225.8 }]
  }, {
    name: 'Thüringen',
    points: [{ x: 777.6, y: 1918.6 }, { x: 696, y: 1990.6 }, { x: 652.8, y: 1990.6 }, { x: 700.8, y: 1966.6 }, { x: 657.6, y: 1961.8 }, { x: 700.8, y: 1933 }, { x: 681.6, y: 1894.6 }, { x: 710.4, y: 1880.2 }, { x: 676.8, y: 1875.4 }, { x: 700.8, y: 1851.4 }, { x: 777.6, y: 1870.6 }, { x: 777.6, y: 1918.6 }]
  }, {
    name: 'Thüringerberg',
    points: [{ x: 859.2, y: 1865.8 }, { x: 777.6, y: 1918.6 }, { x: 777.6, y: 1870.6 }, { x: 700.81, y: 1851.4 }, { x: 715.21, y: 1750.6 }, { x: 792, y: 1736.2 }, { x: 859.2, y: 1865.8 }]
  }, {
    name: 'Tschagguns',
    points: [{ x: 1248, y: 2643.4 }, { x: 1128, y: 2696.2 }, { x: 1070.4, y: 2830.6 }, { x: 1017.6, y: 2782.6 }, { x: 1041.6, y: 2734.6 }, { x: 912, y: 2763.4 }, { x: 782.4, y: 2677 }, { x: 864, y: 2624.2 }, { x: 859.2, y: 2561.82 }, { x: 902.4, y: 2523.42 }, { x: 1080, y: 2446.62 }, { x: 1209.59, y: 2542.62 }, { x: 1247.99, y: 2643.4 }]
  }, {
    name: 'Vandans',
    points: [{ x: 1017.6, y: 2369.8 }, { x: 1080, y: 2446.6 }, { x: 902.4, y: 2523.4 }, { x: 859.2, y: 2561.8 }, { x: 864, y: 2624.2 }, { x: 782.4, y: 2677 }, { x: 758.4, y: 2643.4 }, { x: 561.61, y: 2609.8 }, { x: 523.21, y: 2566.6 }, { x: 672.01, y: 2528.2 }, { x: 705.61, y: 2413 }, { x: 796.8, y: 2408.2 }, { x: 878.4, y: 2336.2 }, { x: 988.79, y: 2293 }, { x: 1017.59, y: 2369.8 }]
  }, {
    name: 'Alberschwende',
    points: [{ x: 1017.6, y: 627.2 }, { x: 1060.8, y: 694.4 }, { x: 1156.79, y: 795.2 }, { x: 1171.19, y: 838.4 }, { x: 1051.19, y: 848 }, { x: 960, y: 881.6 }, { x: 926.4, y: 857.6 }, { x: 892.8, y: 814.4 }, { x: 964.79, y: 694.4 }, { x: 1007.99, y: 617.6 }, { x: 1017.59, y: 627.2 }]
  }, {
    name: 'Andelsbuch',
    points: [{ x: 1416, y: 1078.4 }, { x: 1267.2, y: 1073.6 }, { x: 1224, y: 1040 }, { x: 1123.2, y: 1092.8 }, { x: 1070.41, y: 1097.6 }, { x: 1032.01, y: 1073.6 }, { x: 1032.01, y: 1035.2 }, { x: 1113.6, y: 1020.8 }, { x: 1128, y: 939.2 }, { x: 1176, y: 910.42 }, { x: 1195.2, y: 968 }, { x: 1272, y: 953.6 }, { x: 1320, y: 982.4 }, { x: 1315.2, y: 1025.6 }, { x: 1420.8, y: 1054.4 }, { x: 1416, y: 1078.4 }]
  }, {
    name: 'Au',
    points: [{ x: 1555.2, y: 1294.4 }, { x: 1507.2, y: 1361.6 }, { x: 1468.8, y: 1462.4 }, { x: 1488, y: 1491.2 }, { x: 1444.8, y: 1558.4 }, { x: 1473.6, y: 1620.8 }, { x: 1377.6, y: 1640 }, { x: 1377.6, y: 1592 }, { x: 1300.81, y: 1582.4 }, { x: 1281.61, y: 1515.2 }, { x: 1252.81, y: 1539.2 }, { x: 1128.01, y: 1428.8 }, { x: 1252.81, y: 1409.6 }, { x: 1257.61, y: 1347.2 }, { x: 1358.4, y: 1313.6 }, { x: 1377.6, y: 1347.2 }, { x: 1372.8, y: 1308.8 }, { x: 1488, y: 1289.6 }, { x: 1507.2, y: 1308.8 }, { x: 1555.2, y: 1294.4 }]
  }, {
    name: 'Bezau',
    points: [{ x: 1416, y: 1078.4 }, { x: 1492.8, y: 1078.4 }, { x: 1531.2, y: 1121.6 }, { x: 1631.98, y: 1107.2 }, { x: 1598.38, y: 1140.8 }, { x: 1646.38, y: 1246.4 }, { x: 1699.18, y: 1265.6 }, { x: 1694.38, y: 1299.2 }, { x: 1756.78, y: 1352 }, { x: 1689.58, y: 1361.6 }, { x: 1627.18, y: 1361.6 }, { x: 1555.2, y: 1294.4 }, { x: 1526.4, y: 1232 }, { x: 1545.6, y: 1198.4 }, { x: 1497.6, y: 1203.2 }, { x: 1502.4, y: 1150.4 }, { x: 1459.2, y: 1145.6 }, { x: 1459.2, y: 1107.2 }, { x: 1296, y: 1160 }, { x: 1200, y: 1140.8 }, { x: 1152, y: 1164.8 }, { x: 1123.2, y: 1092.8 }, { x: 1224, y: 1040 }, { x: 1267.2, y: 1073.6 }, { x: 1416, y: 1078.4 }]
  }, {
    name: 'Bildstein',
    points: [{ x: 964.8, y: 694.4 }, { x: 892.8, y: 814.4 }, { x: 825.61, y: 824 }, { x: 859.2, y: 776 }, { x: 772.81, y: 761.6 }, { x: 758.41, y: 723.2 }, { x: 868.8, y: 694.4 }, { x: 964.8, y: 694.4 }]
  }, {
    name: 'Bizau',
    points: [{ x: 1555.2, y: 1294.4 }, { x: 1507.2, y: 1308.8 }, { x: 1488, y: 1289.6 }, { x: 1478.4, y: 1232 }, { x: 1185.6, y: 1227.2 }, { x: 1200, y: 1140.82 }, { x: 1296, y: 1160 }, { x: 1459.2, y: 1107.22 }, { x: 1459.2, y: 1145.62 }, { x: 1502.4, y: 1150.42 }, { x: 1497.6, y: 1203.2 }, { x: 1545.6, y: 1198.4 }, { x: 1526.4, y: 1232 }, { x: 1555.2, y: 1294.4 }]
  }, {
    name: 'Bregenz',
    points: [{ x: 715.2, y: 425.6 }, { x: 753.59, y: 468.8 }, { x: 753.59, y: 521.6 }, { x: 820.79, y: 574.4 }, { x: 907.19, y: 507.2 }, { x: 911.99, y: 512 }, { x: 878.39, y: 574.4 }, { x: 921.59, y: 612.8 }, { x: 863.99, y: 660.8 }, { x: 825.59, y: 603.2 }, { x: 705.59, y: 627.2 }, { x: 647.99, y: 617.6 }, { x: 508.79, y: 454.4 }, { x: 700.79, y: 411.2 }, { x: 715.19, y: 425.6 }]
  }, {
    name: 'Buch',
    points: [{ x: 1008, y: 617.6 }, { x: 964.8, y: 694.4 }, { x: 868.8, y: 694.4 }, { x: 864, y: 660.8 }, { x: 921.6, y: 612.8 }, { x: 1008, y: 617.6 }]
  }, {
    name: 'Damüls',
    points: [{ x: 1252.8, y: 1539.2 }, { x: 1147.2, y: 1582.4 }, { x: 1027.2, y: 1587.2 }, { x: 1012.8, y: 1620.8 }, { x: 998.4, y: 1620.8 }, { x: 926.41, y: 1568 }, { x: 950.41, y: 1548.8 }, { x: 1003.2, y: 1515.2 }, { x: 998.4, y: 1467.2 }, { x: 1128, y: 1428.8 }, { x: 1252.8, y: 1539.2 }]
  }, {
    name: 'Doren',
    points: [{ x: 1257.6, y: 579.2 }, { x: 1262.4, y: 608 }, { x: 1132.8, y: 665.6 }, { x: 1060.8, y: 694.4 }, { x: 1017.6, y: 627.2 }, { x: 1099.2, y: 526.4 }, { x: 1257.6, y: 579.2 }]
  }, {
    name: 'Egg',
    points: [{ x: 1507.2, y: 896 }, { x: 1555.2, y: 920 }, { x: 1598.4, y: 1044.8 }, { x: 1665.6, y: 1040 }, { x: 1660.8, y: 1145.6 }, { x: 1780.8, y: 1246.4 }, { x: 1785.6, y: 1265.6 }, { x: 1847.98, y: 1323.18 }, { x: 1804.8, y: 1313.58 }, { x: 1756.8, y: 1351.98 }, { x: 1694.4, y: 1299.18 }, { x: 1699.2, y: 1265.6 }, { x: 1646.4, y: 1246.4 }, { x: 1598.4, y: 1140.8 }, { x: 1632, y: 1107.2 }, { x: 1531.2, y: 1121.6 }, { x: 1492.8, y: 1078.4 }, { x: 1416, y: 1078.4 }, { x: 1420.8, y: 1054.4 }, { x: 1315.21, y: 1025.6 }, { x: 1320.01, y: 982.4 }, { x: 1272.01, y: 953.6 }, { x: 1195.21, y: 968 }, { x: 1176.02, y: 910.4 }, { x: 1128.02, y: 939.2 }, { x: 1051.22, y: 848 }, { x: 1171.22, y: 838.4 }, { x: 1248.02, y: 852.8 }, { x: 1334.41, y: 814.4 }, { x: 1507.22, y: 896 }]
  }, {
    name: 'Eichenberg',
    points: [{ x: 979.2, y: 387.2 }, { x: 940.8, y: 444.8 }, { x: 960, y: 492.8 }, { x: 912, y: 512 }, { x: 907.2, y: 507.2 }, { x: 859.2, y: 483.2 }, { x: 811.21, y: 392 }, { x: 835.21, y: 320 }, { x: 907.2, y: 320 }, { x: 945.6, y: 382.4 }, { x: 979.2, y: 387.2 }]
  }, {
    name: 'Fußach',
    points: [{ x: 523.2, y: 699.2 }, { x: 532.8, y: 723.2 }, { x: 508.8, y: 737.6 }, { x: 422.4, y: 732.8 }, { x: 460.8, y: 718.4 }, { x: 446.4, y: 651.2 }, { x: 408, y: 632 }, { x: 350.41, y: 492.8 }, { x: 427.2, y: 473.6 }, { x: 499.2, y: 622.4 }, { x: 475.2, y: 694.4 }, { x: 523.2, y: 699.2 }]
  }, {
    name: 'Gaißau',
    points: [{ x: 307.2, y: 680 }, { x: 273.6, y: 713.6 }, { x: 177.6, y: 531.2 }, { x: 230.4, y: 521.6 }, { x: 307.2, y: 680 }]
  }, {
    name: 'Hard',
    points: [{ x: 648, y: 617.6 }, { x: 566.4, y: 713.6 }, { x: 523.2, y: 699.2 }, { x: 475.21, y: 694.4 }, { x: 499.2, y: 622.4 }, { x: 427.21, y: 473.6 }, { x: 508.8, y: 454.4 }, { x: 648, y: 617.6 }]
  }, {
    name: 'Hittisau',
    points: [{ x: 1502.4, y: 680 }, { x: 1651.2, y: 670.4 }, { x: 1665.6, y: 756.8 }, { x: 1713.6, y: 809.6 }, { x: 1780.8, y: 800 }, { x: 1814.38, y: 929.6 }, { x: 1732.8, y: 915.2 }, { x: 1728, y: 867.2 }, { x: 1680, y: 872 }, { x: 1656, y: 838.4 }, { x: 1531.2, y: 862.4 }, { x: 1507.2, y: 896 }, { x: 1334.4, y: 814.4 }, { x: 1334.4, y: 761.6 }, { x: 1305.6, y: 761.6 }, { x: 1291.2, y: 708.8 }, { x: 1324.8, y: 660.8 }, { x: 1363.2, y: 684.8 }, { x: 1406.4, y: 646.4 }, { x: 1502.4, y: 680 }]
  }, {
    name: 'Höchst',
    points: [{ x: 508.8, y: 737.6 }, { x: 460.8, y: 771.2 }, { x: 350.41, y: 742.4 }, { x: 307.21, y: 680 }, { x: 230.41, y: 521.6 }, { x: 350.41, y: 492.8 }, { x: 408.01, y: 632 }, { x: 446.41, y: 651.2 }, { x: 460.81, y: 718.4 }, { x: 422.41, y: 732.8 }, { x: 508.8, y: 737.6 }]
  }, {
    name: 'Hörbranz',
    points: [{ x: 840, y: 276.8 }, { x: 835.2, y: 320 }, { x: 811.2, y: 392 }, { x: 772.8, y: 377.6 }, { x: 715.21, y: 425.6 }, { x: 700.81, y: 411.2 }, { x: 782.4, y: 243.2 }, { x: 840, y: 276.8 }]
  }, {
    name: 'Hohenweiler',
    points: [{ x: 979.2, y: 180.8 }, { x: 931.2, y: 176 }, { x: 892.8, y: 252.8 }, { x: 840, y: 276.8 }, { x: 782.41, y: 243.2 }, { x: 811.21, y: 166.4 }, { x: 859.2, y: 147.2 }, { x: 921.6, y: 142.4 }, { x: 979.2, y: 180.8 }]
  }, {
    name: 'Kennelbach',
    points: [{ x: 864, y: 660.8 }, { x: 796.8, y: 684.8 }, { x: 705.61, y: 627.2 }, { x: 825.61, y: 603.2 }, { x: 864, y: 660.8 }]
  }, {
    name: 'Krumbach',
    points: [{ x: 1324.8, y: 660.8 }, { x: 1291.2, y: 708.8 }, { x: 1166.4, y: 699.2 }, { x: 1132.8, y: 665.6 }, { x: 1262.4, y: 608 }, { x: 1257.6, y: 579.2 }, { x: 1267.2, y: 574.4 }, { x: 1324.8, y: 603.2 }, { x: 1324.8, y: 660.8 }]
  }, {
    name: 'Langen',
    points: [{ x: 1132.8, y: 454.2 }, { x: 1099.2, y: 526.2 }, { x: 1017.6, y: 627 }, { x: 1008, y: 617.4 }, { x: 921.61, y: 612.6 }, { x: 878.41, y: 574.2 }, { x: 912.01, y: 511.8 }, { x: 960, y: 492.6 }, { x: 940.81, y: 444.6 }, { x: 979.2, y: 387 }, { x: 998.4, y: 377.4 }, { x: 1132.8, y: 454.2 }]
  }, {
    name: 'Langenegg',
    points: [{ x: 1291.2, y: 708.8 }, { x: 1305.6, y: 761.6 }, { x: 1156.8, y: 795.2 }, { x: 1060.8, y: 694.4 }, { x: 1132.8, y: 665.6 }, { x: 1166.4, y: 699.2 }, { x: 1291.2, y: 708.8 }]
  }, {
    name: 'Lauterach',
    points: [{ x: 705.6, y: 627.2 }, { x: 715.2, y: 713.6 }, { x: 624, y: 785.6 }, { x: 580.8, y: 790.4 }, { x: 532.8, y: 723.2 }, { x: 523.2, y: 699.2 }, { x: 566.4, y: 713.6 }, { x: 648, y: 617.6 }, { x: 705.6, y: 627.2 }]
  }, {
    name: 'Lingenau',
    points: [{ x: 1334.4, y: 814.4 }, { x: 1248, y: 852.8 }, { x: 1171.21, y: 838.4 }, { x: 1156.81, y: 795.2 }, { x: 1305.61, y: 761.6 }, { x: 1334.4, y: 761.6 }, { x: 1334.4, y: 814.4 }]
  }, {
    name: 'Lochau',
    points: [{ x: 811.2, y: 392 }, { x: 859.19, y: 483.2 }, { x: 907.19, y: 507.2 }, { x: 820.8, y: 574.4 }, { x: 753.6, y: 521.6 }, { x: 753.6, y: 468.8 }, { x: 715.2, y: 425.6 }, { x: 772.8, y: 377.6 }, { x: 811.2, y: 392 }]
  }, {
    name: 'Mittelberg',
    points: [{ x: 1992, y: 1616 }, { x: 1915.2, y: 1620.8 }, { x: 1862.4, y: 1582.4 }, { x: 1857.6, y: 1640 }, { x: 1824, y: 1630.4 }, { x: 1742.4, y: 1592 }, { x: 1708.8, y: 1515.2 }, { x: 1728, y: 1424 }, { x: 1689.6, y: 1361.62 }, { x: 1756.8, y: 1352.02 }, { x: 1804.8, y: 1313.62 }, { x: 1848, y: 1323.22 }, { x: 1785.6, y: 1265.62 }, { x: 1848, y: 1174.42 }, { x: 1915.2, y: 1217.62 }, { x: 1987.2, y: 1212.82 }, { x: 2001.6, y: 1136.02 }, { x: 2054.4, y: 1116.82 }, { x: 2136, y: 1164.82 }, { x: 2179.18, y: 1126.42 }, { x: 2207.98, y: 1160.02 }, { x: 2083.18, y: 1404.82 }, { x: 2116.78, y: 1438.42 }, { x: 2116.78, y: 1500.82 }, { x: 2049.58, y: 1548.82 }, { x: 2020.8, y: 1539.22 }, { x: 1992, y: 1616.02 }]
  }, {
    name: 'Möggers',
    points: [{ x: 979.2, y: 180.8 }, { x: 988.8, y: 310.4 }, { x: 955.2, y: 353.6 }, { x: 998.4, y: 377.6 }, { x: 979.2, y: 387.2 }, { x: 945.6, y: 382.4 }, { x: 907.2, y: 320 }, { x: 835.21, y: 320 }, { x: 840, y: 276.8 }, { x: 892.8, y: 252.8 }, { x: 931.2, y: 176 }, { x: 979.2, y: 180.8 }]
  }, {
    name: 'Reuthe',
    points: [{ x: 1200, y: 1140.8 }, { x: 1185.6, y: 1227.2 }, { x: 1171.2, y: 1227.2 }, { x: 1118.4, y: 1217.6 }, { x: 1118.4, y: 1169.6 }, { x: 1008.01, y: 1208 }, { x: 993.61, y: 1126.4 }, { x: 1075.21, y: 1121.6 }, { x: 1070.41, y: 1097.6 }, { x: 1123.2, y: 1092.8 }, { x: 1152, y: 1164.8 }, { x: 1200, y: 1140.8 }]
  }, {
    name: 'Lustenau',
    points: [{ x: 580.8, y: 790.4 }, { x: 561.6, y: 1040 }, { x: 494.4, y: 1044.8 }, { x: 427.2, y: 982.4 }, { x: 412.8, y: 852.8 }, { x: 460.8, y: 771.2 }, { x: 508.8, y: 737.6 }, { x: 532.8, y: 723.2 }, { x: 580.8, y: 790.4 }]
  }, {
    name: 'Altach',
    points: [{ x: 475.2, y: 1256 }, { x: 446.4, y: 1217.6 }, { x: 350.4, y: 1232 }, { x: 364.8, y: 1198.4 }, { x: 321.6, y: 1164.8 }, { x: 412.8, y: 1150.4 }, { x: 460.8, y: 1179.2 }, { x: 475.2, y: 1256 }]
  }, {
    name: 'Düns',
    points: [{ x: 633.6, y: 1808.2 }, { x: 566.4, y: 1832.2 }, { x: 513.6, y: 1798.6 }, { x: 561.6, y: 1741 }, { x: 566.4, y: 1774.6 }, { x: 633.6, y: 1808.2 }]
  }, {
    name: 'Dünserberg',
    points: [{ x: 686.4, y: 1745.8 }, { x: 686.4, y: 1817.8 }, { x: 633.6, y: 1808.2 }, { x: 566.4, y: 1774.6 }, { x: 561.6, y: 1741 }, { x: 566.4, y: 1736.2 }, { x: 600, y: 1717 }, { x: 619.2, y: 1736.2 }, { x: 662.4, y: 1707.4 }, { x: 686.4, y: 1745.8 }]
  }, {
    name: 'Feldkirch',
    points: [{ x: 177.6, y: 1510.4 }, { x: 316.8, y: 1587.2 }, { x: 321.6, y: 1664 }, { x: 244.8, y: 1755.2 }, { x: 201.6, y: 1755.2 }, { x: 216, y: 1817.58 }, { x: 182.4, y: 1870.38 }, { x: 81.61, y: 1779.18 }, { x: 134.4, y: 1697.6 }, { x: 28.81, y: 1563.2 }, { x: 110.41, y: 1452.8 }, { x: 134.4, y: 1500.8 }, { x: 134.4, y: 1476.8 }, { x: 177.6, y: 1467.2 }, { x: 177.6, y: 1510.4 }]
  }, {
    name: 'Frastanz',
    points: [{ x: 350.4, y: 1779.2 }, { x: 403.19, y: 1827.2 }, { x: 345.6, y: 1846.4 }, { x: 374.39, y: 1889.6 }, { x: 393.59, y: 1856 }, { x: 417.59, y: 1928 }, { x: 369.59, y: 1928 }, { x: 374.39, y: 1894.4 }, { x: 350.4, y: 1851.2 }, { x: 278.4, y: 2115.2 }, { x: 235.2, y: 2124.8 }, { x: 206.4, y: 2057.6 }, { x: 110.41, y: 2019.2 }, { x: 182.4, y: 1870.4 }, { x: 216, y: 1817.6 }, { x: 201.6, y: 1755.2 }, { x: 244.8, y: 1755.2 }, { x: 350.4, y: 1779.2 }]
  }, {
    name: 'Fraxern',
    points: [{ x: 652.8, y: 1342.4 }, { x: 470.4, y: 1414.4 }, { x: 441.6, y: 1380.8 }, { x: 470.4, y: 1332.8 }, { x: 604.8, y: 1289.6 }, { x: 633.6, y: 1260.8 }, { x: 652.8, y: 1342.4 }]
  }, {
    name: 'Göfis',
    points: [{ x: 412.8, y: 1726.4 }, { x: 350.4, y: 1779.2 }, { x: 244.8, y: 1755.2 }, { x: 321.6, y: 1664 }, { x: 364.8, y: 1635.2 }, { x: 379.2, y: 1673.6 }, { x: 408, y: 1659.2 }, { x: 412.8, y: 1726.4 }]
  }, {
    name: 'Götzis',
    points: [{ x: 475.2, y: 1256 }, { x: 561.59, y: 1251.2 }, { x: 604.79, y: 1289.6 }, { x: 470.39, y: 1332.8 }, { x: 422.39, y: 1366.4 }, { x: 369.59, y: 1352 }, { x: 312, y: 1236.8 }, { x: 350.4, y: 1232 }, { x: 446.39, y: 1217.6 }, { x: 475.19, y: 1256 }]
  }, {
    name: 'Klaus',
    points: [{ x: 441.6, y: 1380.8 }, { x: 403.2, y: 1433.6 }, { x: 312, y: 1424 }, { x: 316.8, y: 1395.2 }, { x: 369.6, y: 1352 }, { x: 422.4, y: 1366.4 }, { x: 470.4, y: 1332.8 }, { x: 441.6, y: 1380.8 }]
  }, {
    name: 'Koblach',
    points: [{ x: 369.6, y: 1352 }, { x: 316.8, y: 1395.2 }, { x: 288, y: 1419.2 }, { x: 240, y: 1409.6 }, { x: 216.01, y: 1361.6 }, { x: 244.8, y: 1275.2 }, { x: 312, y: 1236.8 }, { x: 369.6, y: 1352 }]
  }, {
    name: 'Laterns',
    points: [{ x: 950.4, y: 1549 }, { x: 926.4, y: 1568.2 }, { x: 998.39, y: 1621 }, { x: 931.2, y: 1688.2 }, { x: 892.8, y: 1645 }, { x: 840, y: 1640.2 }, { x: 792, y: 1659.4 }, { x: 844.8, y: 1712.2 }, { x: 792, y: 1736.2 }, { x: 715.21, y: 1750.6 }, { x: 686.41, y: 1745.8 }, { x: 662.41, y: 1707.4 }, { x: 619.21, y: 1736.2 }, { x: 600.01, y: 1717 }, { x: 600.01, y: 1688.2 }, { x: 508.81, y: 1635.4 }, { x: 508.81, y: 1616.2 }, { x: 561.61, y: 1573 }, { x: 720.01, y: 1549 }, { x: 792.01, y: 1438.6 }, { x: 840, y: 1510.6 }, { x: 950.4, y: 1549 }]
  }, {
    name: 'Mäder',
    points: [{ x: 350.4, y: 1232 }, { x: 312, y: 1236.8 }, { x: 244.8, y: 1275.2 }, { x: 321.6, y: 1164.8 }, { x: 364.79, y: 1198.4 }, { x: 350.4, y: 1232 }]
  }, {
    name: 'Meiningen',
    points: [{ x: 240, y: 1409.6 }, { x: 177.6, y: 1510.4 }, { x: 177.6, y: 1467.2 }, { x: 134.4, y: 1476.8 }, { x: 134.4, y: 1500.8 }, { x: 110.41, y: 1452.8 }, { x: 216, y: 1361.6 }, { x: 240, y: 1409.6 }]
  }, {
    name: 'Rankweil',
    points: [{ x: 288, y: 1419.2 }, { x: 312, y: 1457.6 }, { x: 403.19, y: 1534.4 }, { x: 508.79, y: 1616 }, { x: 508.79, y: 1635.2 }, { x: 455.99, y: 1606.4 }, { x: 431.99, y: 1707.2 }, { x: 412.79, y: 1726.4 }, { x: 407.99, y: 1659.2 }, { x: 379.19, y: 1673.6 }, { x: 364.79, y: 1635.2 }, { x: 321.6, y: 1664 }, { x: 316.8, y: 1587.2 }, { x: 177.6, y: 1510.4 }, { x: 240, y: 1409.6 }, { x: 287.99, y: 1419.2 }]
  }, {
    name: 'Röns',
    points: [{ x: 566.4, y: 1832.2 }, { x: 561.6, y: 1841.8 }, { x: 489.6, y: 1827.4 }, { x: 513.6, y: 1798.6 }, { x: 566.4, y: 1832.2 }]
  }, {
    name: 'Röthis',
    points: [{ x: 312, y: 1424 }, { x: 388.79, y: 1467.2 }, { x: 455.99, y: 1443.2 }, { x: 523.19, y: 1457.6 }, { x: 455.99, y: 1486.4 }, { x: 417.59, y: 1500.8 }, { x: 321.6, y: 1438.4 }, { x: 312, y: 1457.6 }, { x: 288, y: 1419.2 }, { x: 316.8, y: 1395.2 }, { x: 312, y: 1424 }]
  }, {
    name: 'Satteins',
    points: [{ x: 566.4, y: 1736 }, { x: 561.6, y: 1740.8 }, { x: 513.6, y: 1798.4 }, { x: 489.6, y: 1827.2 }, { x: 441.6, y: 1875.2 }, { x: 403.2, y: 1827.2 }, { x: 350.41, y: 1779.2 }, { x: 412.8, y: 1726.4 }, { x: 432, y: 1707.2 }, { x: 528, y: 1688 }, { x: 566.4, y: 1736 }]
  }, {
    name: 'Schlins',
    points: [{ x: 561.6, y: 1841.8 }, { x: 609.59, y: 1880.2 }, { x: 556.8, y: 1933 }, { x: 441.6, y: 1875.4 }, { x: 489.6, y: 1827.4 }, { x: 561.6, y: 1841.8 }]
  }, {
    name: 'Riefensberg',
    points: [{ x: 1502.4, y: 680 }, { x: 1406.4, y: 646.4 }, { x: 1363.2, y: 684.8 }, { x: 1324.8, y: 660.8 }, { x: 1324.8, y: 603.2 }, { x: 1267.21, y: 574.4 }, { x: 1406.4, y: 492.8 }, { x: 1492.8, y: 588.8 }, { x: 1468.8, y: 608 }, { x: 1502.4, y: 680 }]
  }, {
    name: 'Schnepfau',
    points: [{ x: 1185.6, y: 1227.2 }, { x: 1478.4, y: 1232 }, { x: 1488, y: 1289.6 }, { x: 1372.8, y: 1308.8 }, { x: 1377.6, y: 1347.2 }, { x: 1358.4, y: 1313.6 }, { x: 1257.6, y: 1347.2 }, { x: 1214.4, y: 1337.6 }, { x: 1171.21, y: 1227.2 }, { x: 1185.61, y: 1227.2 }]
  }, {
    name: 'Schoppernau',
    points: [{ x: 1689.6, y: 1361.6 }, { x: 1728, y: 1424 }, { x: 1708.8, y: 1515.2 }, { x: 1742.4, y: 1592 }, { x: 1675.2, y: 1606.4 }, { x: 1665.6, y: 1663.98 }, { x: 1588.8, y: 1716.78 }, { x: 1473.6, y: 1620.8 }, { x: 1444.8, y: 1558.4 }, { x: 1488, y: 1491.2 }, { x: 1468.8, y: 1462.4 }, { x: 1507.2, y: 1361.6 }, { x: 1555.2, y: 1294.4 }, { x: 1627.2, y: 1361.6 }, { x: 1689.6, y: 1361.6 }]
  }, {
    name: 'Schröcken',
    points: [{ x: 1824, y: 1630.4 }, { x: 1819.2, y: 1712 }, { x: 1876.8, y: 1736 }, { x: 1843.2, y: 1784 }, { x: 1785.6, y: 1788.8 }, { x: 1761.6, y: 1841.6 }, { x: 1656, y: 1822.4 }, { x: 1675.2, y: 1750.4 }, { x: 1612.8, y: 1750.4 }, { x: 1588.8, y: 1716.8 }, { x: 1665.6, y: 1664 }, { x: 1675.2, y: 1606.4 }, { x: 1742.4, y: 1592 }, { x: 1824, y: 1630.4 }]
  }, {
    name: 'Schwarzach',
    points: [{ x: 825.6, y: 824 }, { x: 768, y: 852.8 }, { x: 696, y: 814.4 }, { x: 772.8, y: 761.6 }, { x: 859.19, y: 776 }, { x: 825.6, y: 824 }]
  }, {
    name: 'Schwarzenberg',
    points: [{ x: 1128, y: 939.2 }, { x: 1113.6, y: 1020.8 }, { x: 1032, y: 1035.2 }, { x: 1032, y: 1073.6 }, { x: 1070.4, y: 1097.6 }, { x: 1075.2, y: 1121.6 }, { x: 993.6, y: 1126.4 }, { x: 921.61, y: 1049.6 }, { x: 888.01, y: 953.6 }, { x: 926.41, y: 857.6 }, { x: 960, y: 881.6 }, { x: 1051.2, y: 848 }, { x: 1128, y: 939.2 }]
  }, {
    name: 'Mellau',
    points: [{ x: 1171.2, y: 1227.2 }, { x: 1214.39, y: 1337.6 }, { x: 1257.59, y: 1347.2 }, { x: 1252.79, y: 1409.6 }, { x: 1127.99, y: 1428.8 }, { x: 998.39, y: 1467.2 }, { x: 912, y: 1419.2 }, { x: 945.6, y: 1371.2 }, { x: 921.6, y: 1328 }, { x: 945.6, y: 1323.2 }, { x: 902.4, y: 1270.4 }, { x: 1007.99, y: 1208 }, { x: 1118.39, y: 1169.6 }, { x: 1118.39, y: 1217.6 }, { x: 1171.19, y: 1227.2 }]
  }, {
    name: 'Sibratsgfäll',
    points: [{ x: 1814.4, y: 929.6 }, { x: 1780.8, y: 982.4 }, { x: 1704, y: 1016 }, { x: 1747.2, y: 1064 }, { x: 1780.8, y: 1246.4 }, { x: 1660.8, y: 1145.6 }, { x: 1665.6, y: 1040 }, { x: 1598.4, y: 1044.8 }, { x: 1555.2, y: 920 }, { x: 1507.2, y: 896 }, { x: 1531.2, y: 862.4 }, { x: 1656, y: 838.4 }, { x: 1680, y: 872 }, { x: 1728, y: 867.2 }, { x: 1732.8, y: 915.2 }, { x: 1814.4, y: 929.6 }]
  }, {
    name: 'Sulzberg',
    points: [{ x: 1406.4, y: 492.8 }, { x: 1267.2, y: 574.4 }, { x: 1257.6, y: 579.2 }, { x: 1099.2, y: 526.4 }, { x: 1132.8, y: 454.4 }, { x: 1156.8, y: 368 }, { x: 1233.59, y: 396.8 }, { x: 1276.79, y: 454.4 }, { x: 1334.39, y: 430.4 }, { x: 1406.38, y: 440 }, { x: 1420.78, y: 387.2 }, { x: 1406.38, y: 492.8 }]
  }, {
    name: 'Warth',
    points: [{ x: 1992, y: 1616 }, { x: 2011.2, y: 1654.4 }, { x: 1996.8, y: 1683.2 }, { x: 2140.8, y: 1736 }, { x: 2064, y: 1812.8 }, { x: 2044.8, y: 1779.2 }, { x: 1876.8, y: 1736 }, { x: 1819.2, y: 1712 }, { x: 1824, y: 1630.4 }, { x: 1857.6, y: 1640 }, { x: 1862.4, y: 1582.4 }, { x: 1915.2, y: 1620.8 }, { x: 1992, y: 1616 }]
  }, {
    name: 'Wolfurt',
    points: [{ x: 864, y: 660.8 }, { x: 868.8, y: 694.4 }, { x: 758.4, y: 723.2 }, { x: 772.8, y: 761.6 }, { x: 696.01, y: 814.4 }, { x: 624.01, y: 785.6 }, { x: 715.21, y: 713.6 }, { x: 705.61, y: 627.2 }, { x: 796.8, y: 684.8 }, { x: 864, y: 660.8 }]
  }, {
    name: 'Dornbirn',
    points: [{ x: 696, y: 814.4 }, { x: 767.99, y: 852.8 }, { x: 825.59, y: 824 }, { x: 892.79, y: 814.4 }, { x: 926.39, y: 857.6 }, { x: 887.99, y: 953.6 }, { x: 921.59, y: 1049.6 }, { x: 993.58, y: 1126.4 }, { x: 1007.98, y: 1207.98 }, { x: 902.39, y: 1270.38 }, { x: 945.59, y: 1323.18 }, { x: 921.59, y: 1327.98 }, { x: 945.59, y: 1371.18 }, { x: 911.99, y: 1419.18 }, { x: 998.38, y: 1467.18 }, { x: 1003.18, y: 1515.18 }, { x: 950.39, y: 1548.78 }, { x: 839.99, y: 1510.38 }, { x: 791.99, y: 1438.38 }, { x: 715.2, y: 1433.58 }, { x: 652.8, y: 1342.38 }, { x: 633.6, y: 1260.78 }, { x: 652.8, y: 1212.78 }, { x: 753.59, y: 1188.78 }, { x: 758.39, y: 1136 }, { x: 561.6, y: 1040 }, { x: 580.8, y: 790.4 }, { x: 623.99, y: 785.6 }, { x: 695.99, y: 814.4 }]
  }, {
    name: 'Hohenems',
    points: [{ x: 633.6, y: 1260.8 }, { x: 604.8, y: 1289.6 }, { x: 561.6, y: 1251.2 }, { x: 475.21, y: 1256 }, { x: 460.81, y: 1179.2 }, { x: 412.81, y: 1150.4 }, { x: 480, y: 1102.4 }, { x: 494.4, y: 1044.8 }, { x: 561.6, y: 1040 }, { x: 758.4, y: 1136 }, { x: 753.6, y: 1188.8 }, { x: 652.8, y: 1212.8 }, { x: 633.6, y: 1260.8 }]
  }, {
    name: 'Viktorsberg',
    points: [{ x: 792, y: 1438.4 }, { x: 681.6, y: 1491.2 }, { x: 403.2, y: 1433.6 }, { x: 523.21, y: 1457.6 }, { x: 456.01, y: 1443.2 }, { x: 470.41, y: 1414.4 }, { x: 652.81, y: 1342.4 }, { x: 715.21, y: 1433.6 }, { x: 792, y: 1438.4 }]
  }, {
    name: 'Weiler',
    points: [{ x: 470.4, y: 1414.4 }, { x: 441.6, y: 1380.8 }, { x: 402.6, y: 1430.2 }, { x: 312, y: 1424 }, { x: 388.79, y: 1467.2 }, { x: 455.99, y: 1443.2 }]
  }, {
    name: 'Zwischenwasser',
    points: [{ x: 508.8, y: 1616 }, { x: 403.2, y: 1534.4 }, { x: 456, y: 1486.4 }, { x: 523.2, y: 1457.6 }, { x: 619.19, y: 1438.4 }, { x: 681.59, y: 1491.2 }, { x: 791.99, y: 1438.4 }, { x: 719.99, y: 1548.8 }, { x: 561.59, y: 1572.8 }, { x: 508.79, y: 1616 }]
  }]

export const dataProvider : MapDataProvider = { mapItems }