defmodule SolutionPartOne do
  def solve(input) do
    %{two: two, three: three} = input
    |> Enum.reduce(%{two: 0, three: 0}, &accumulate/2)

    two * three
  end

  defp accumulate(value, %{two: two, three: three}) do
    counts = value
    |> count_chars()
    |> Map.values()

    [2 in counts, 3 in counts]
    |> case do
      [true, true] -> %{two: two + 1, three: three + 1}
      [true, false] -> %{two: two + 1, three: three}
      [false, true] -> %{two: two, three: three + 1}
      _ -> %{two: two, three: three}
    end
  end

  defp count_chars(value) do
    value
    |> String.graphemes()
    |> Enum.reduce(%{}, fn char, acc -> Map.put(acc, char, (acc[char] || 0) + 1) end)
  end
end

defmodule SolutionPartTwo do
  def solve(input) do
    input
    |> Enum.reduce(nil, fn (value, acc) -> find_similar(value, input, acc) end)
  end

  defp find_similar(value, list, nil) do
    list
    |> Enum.reduce(nil, fn (other_value, acc) -> compare_values(value, other_value, acc) end)
  end
  defp find_similar(_, _, result), do: result

  defp compare_values(base_value, compared_value, nil) do
    common_value = base_value
    |> String.graphemes()
    |> Enum.with_index()
    |> Enum.filter(fn ({char, index}) -> String.at(compared_value, index) == char end)
    |> Enum.map(fn ({char, _}) -> char end)
    |> Enum.join("")

    if (String.length(common_value) + 1 == String.length(base_value)) do
      common_value
    else
      nil
    end
  end
  defp compare_values(_, _, result), do: result
end

ExUnit.start()

defmodule SolutionTest do
  use ExUnit.Case

  alias SolutionPartOne, as: PartOne
  alias SolutionPartTwo, as: PartTwo

  test "Part I" do
    assert PartOne.solve([
      "abcdef",
      "bababc",
      "abbcde",
      "abcccd",
      "aabcdd",
      "abcdee",
      "ababab"
    ]) == 12
  end

  test "Part II" do
    assert PartTwo.solve([
      "abcde",
      "fghij",
      "klmno",
      "pqrst",
      "fguij",
      "axcye",
      "wvxyz"
    ]) == "fgij"
  end
end

input = File.stream!("02.input.txt")
|> Stream.map(&String.trim_trailing/1)
|> Enum.to_list()

IO.puts("Part I")
input
|> SolutionPartOne.solve()
|> IO.puts()

IO.puts("\nPart II")
input
|> SolutionPartTwo.solve()
|> IO.puts()
