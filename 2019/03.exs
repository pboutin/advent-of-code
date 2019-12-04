defmodule Solution do
  def solve_part_one do
    input()
    |> Enum.map(&parse_cable/1)
    |> opposite_segment_pairs()
    |> Enum.map(&compute_intersection/1)
    |> Enum.filter(&!is_nil(&1))
    |> Enum.map(&manhattan_distance_from_center/1)
    |> Enum.min()
  end

  def solve_part_two do
    cables = input()
    |> Enum.map(&parse_cable/1)

    cables
    |> opposite_segment_pairs()
    |> Enum.map(&compute_intersection/1)
    |> Enum.filter(&!is_nil(&1))
    |> Enum.map(& compute_total_steps(&1, cables))
    |> Enum.min()
  end

  def parse_cable(cable_string) do
    cable_string
    |> String.split(",")
    |> Enum.map(&direction_to_vector/1)
    |> Enum.reduce([{0, 0}], fn vector, acc -> acc ++ [sum_vectors(List.last(acc), vector)] end)
    |> Enum.chunk_every(2, 1, :discard)
  end

  def input do
    [
      "R1004,U518,R309,D991,R436,D360,L322,U627,R94,D636,L846,D385,R563,U220,L312,D605,L612,D843,R848,U193,L671,D852,L129,D680,L946,D261,L804,D482,R196,U960,L234,U577,R206,D973,R407,D400,R44,D103,R463,U907,L972,U628,L962,U856,L564,D25,L425,U332,R931,U837,R556,U435,R88,U860,L982,D393,R793,D86,R647,D337,R514,D361,L777,U640,R833,D674,L817,D260,R382,U168,R161,U449,L670,U814,L42,U461,R570,U855,L111,U734,L699,U602,R628,D79,L982,D494,L616,D484,R259,U429,L917,D321,R429,U854,R735,D373,L508,D59,L207,D192,L120,D943,R648,U245,L670,D571,L46,D195,L989,U589,L34,D177,L682,U468,L783,D143,L940,U412,R875,D604,R867,D951,L82,U851,L550,D21,L425,D81,L659,D231,R92,D232,R27,D269,L351,D369,R622,U737,R531,U693,R295,U217,R249,U994,R635,U267,L863,U690,L398,U576,R982,U252,L649,U321,L814,U516,R827,U74,L80,U624,L802,D620,L544,U249,R983,U424,R564,D217,R151,U8,L813,D311,R203,U478,R999,U495,R957,U641,R40,U431,L830,U67,L31,U532,R345,U878,L996,D223,L76,D264,R823,U27,L776,U936,L614,U421,L398,U168,L90,U525,R640,U95,L761,U938,R296,D463,L349,D709,R428,U818,L376,D444,L748,D527,L755,U750,R175,U495,R587,D767,L332,U665,L84,D747,L183,D969,R37,D514,R949,U985,R548,U939,L170,U415,R857,D480,R836,D363,R763,D997,R721,D140,R699,U673,L724,U375,R55,U758,R634,D590,L608,U674,R809,U308,L681,D957,R30,D913,L633,D939,L474,D567,R290,D615,L646,D478,L822,D471,L952,D937,R306,U380,R695,U788,R555,D64,R769,D785,R115,U474,R232,U353,R534,D268,L434,U790,L777,D223,L168,U21,L411,D524,R862,D43,L979,U65,R771,U872,L983,U765,R162",
      "L998,U952,R204,U266,R353,U227,L209,D718,L28,D989,R535,U517,L934,D711,R878,U268,L895,D766,L423,U543,L636,D808,L176,U493,R22,D222,R956,U347,R953,U468,R657,D907,R464,U875,L162,U225,L410,U704,R76,D985,L711,U176,R496,D720,L395,U907,R223,D144,R292,D523,R514,D942,R838,U551,L487,D518,L159,D880,R53,D519,L173,D449,R525,U645,L65,D568,R327,U667,R790,U131,R402,U869,R287,D411,R576,D265,R639,D783,R629,U107,L571,D247,L61,D548,L916,D397,R715,U138,R399,D159,L523,U2,R794,U699,R854,U731,L234,D135,L98,U702,L179,D364,R123,D900,L548,U880,R560,D648,L701,D928,R256,D970,L396,U201,L47,U156,R723,D759,R663,D306,L436,U508,R371,D494,L147,U131,R946,D207,L516,U514,R992,D592,L356,D869,L299,U10,R744,D13,L52,U749,R400,D146,L193,U720,L226,U973,R971,U691,R657,D604,L984,U652,L378,D811,L325,D714,R131,D428,R418,U750,L706,D855,L947,U557,L985,D688,L615,D114,R202,D746,R987,U353,R268,U14,R709,U595,R982,U332,R84,D620,L75,D885,L269,D544,L137,U124,R361,U502,L290,D710,L108,D254,R278,U47,R74,U293,R237,U83,L80,U661,R550,U886,L201,D527,L351,U668,R366,D384,L937,D768,L906,D388,L604,U515,R632,D486,L404,D980,L652,U404,L224,U957,L197,D496,R690,U407,L448,U953,R391,U446,L964,U372,R351,D786,L187,D643,L911,D557,R254,D135,L150,U833,R876,U114,R688,D654,L991,U717,R649,U464,R551,U886,L780,U293,L656,U681,L532,U184,L903,D42,L417,D917,L8,U910,L600,D872,L632,D221,R980,U438,R183,D973,L321,D652,L540,D163,R796,U404,L507,D495,R707,U322,R16,U59,L421,D255,L463,U462,L524,D703,L702,D904,L597,D385,L374,U411,L702,U804,R706,D56,L288"
    ]
  end

  def compute_total_steps(point, [cable1, cable2]), do: compute_steps(point, cable1, 0) + compute_steps(point, cable2, 0)

  def compute_steps(point, cable, position) do
    segment = Enum.at(cable, position)

    if point_on_segment?(point, segment),
      do: steps_to_point(point, segment),
      else: steps_for_segment(segment) + compute_steps(point, cable, position + 1)
  end

  def sum_vectors({x1, y1}, {x2, y2}), do: {x1 + x2, y1 + y2}

  def steps_to_point({x, y}, [{x1, y1}, _]) when x == x1, do: abs(y1 - y)
  def steps_to_point({x, y}, [{x1, y1}, _]) when y == y1, do: abs(x1 - x)

  def steps_for_segment([{x1, y1}, {x2, y2}]) when x1 == x2, do: abs(y2 - y1)
  def steps_for_segment([{x1, y1}, {x2, y2}]) when y1 == y2, do: abs(x2 - x1)

  def compute_intersection([[{x1, y1}, {x2, y2}], [{x3, y3}, {x4, y4}]]) do
    cond do
      ((x1 < x3 && x2 > x3) || (x1 > x3 && x2 < x3)) && ((y3 > y1 && y4 < y1) || (y3 < y1 && y4 > y1)) -> {x3, y1}
      ((y1 < y3 && y2 > y3) || (y1 > y3 && y2 < y3)) && ((x3 > x1 && x4 < x1) || (x3 < x1 && x4 > x1)) -> {x1, y3}
      true -> nil
    end
  end

  def point_on_segment?({x, y}, [{x1, y1}, {x2, y2}]) when x1 == x and x2 == x, do: y < y1 && y > y2 || y > y1 && y < y2
  def point_on_segment?({x, y}, [{x1, y1}, {x2, y2}]) when y1 == y and y2 == y, do: x < x1 && x > x2 || x > x1 && x < x2
  def point_on_segment?(_, _), do: false

  def opposite_segment_pairs([segments_a, segments_b]) do
    for segment_a <- segments_a, segment_b <- segments_b, do: [segment_a, segment_b]
  end

  def manhattan_distance_from_center({x, y}), do: abs(x) + abs(y)

  def direction_to_vector("R" <> value), do: {String.to_integer(value), 0}
  def direction_to_vector("L" <> value), do: {String.to_integer(value) * -1, 0}
  def direction_to_vector("U" <> value), do: {0, String.to_integer(value)}
  def direction_to_vector("D" <> value), do: {0, String.to_integer(value) * -1}
end

IO.puts("Part I")
IO.puts(Solution.solve_part_one())

IO.puts("\nPart II")
IO.puts(Solution.solve_part_two())
