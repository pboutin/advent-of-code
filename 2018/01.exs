defmodule SolutionPartOne do
  def solve(input) do
    input
    |> Enum.map(&String.to_integer/1)
    |> Enum.sum()
  end
end

defmodule SolutionPartTwo do
  def solve(input) do
    input
    |> Enum.map(&String.to_integer/1)
    |> recursion(0, 0, [0])
  end

  defp recursion(list, position, current_value, history) do
    updated_value = list
    |> Enum.at(next_position(list, position))
    |> Kernel.+(current_value)

    history
    |> Enum.member?(updated_value)
    |> if do
      updated_value
    else
      recursion(list, position + 1, updated_value, history ++ [updated_value])
     end
  end

  defp next_position(list, position), do: rem(position, length(list))
end

ExUnit.start()

defmodule SolutionTest do
  use ExUnit.Case

  alias SolutionPartOne, as: PartOne
  alias SolutionPartTwo, as: PartTwo

  test "Part I" do
    assert PartOne.solve(["+1", "+1", "+1"]) == 3
    assert PartOne.solve(["+1", "+1", "-2"]) == 0
    assert PartOne.solve(["-1", "-2", "-3"]) == -6
  end

  test "Part II" do
    assert PartTwo.solve(["+1", "-1"]) == 0
    assert PartTwo.solve(["+3", "+3", "+4", "-2", "-4"]) == 10
    assert PartTwo.solve(["-6", "+3", "+8", "+5", "-6"]) == 5
    assert PartTwo.solve(["+7", "+7", "-2", "-7", "-4"]) == 14
  end
end

input = File.stream!("01.input.txt")
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
