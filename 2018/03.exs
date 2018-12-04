defmodule Utils do
  def parse_claim(claim) do
    [_, id, left_offset, top_offset, width, height] = ~r/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
    |> Regex.run(claim)

    %{
      id: id,
      left_offset: String.to_integer(left_offset),
      top_offset: String.to_integer(top_offset),
      width: String.to_integer(width),
      height: String.to_integer(height)
    }
  end
end

defmodule SolutionPartOne do
  def solve(claims) do
    claims
    |> Enum.map(&Utils.parse_claim/1)
    |> Enum.reduce(%{}, &accumulate/2)
    |> Map.values()
    |> Enum.filter(fn count -> count > 1 end)
    |> Kernel.length
  end

  defp accumulate(%{left_offset: left_offset, top_offset: top_offset, width: width, height: height}, acc) do
    Enum.reduce(left_offset..(left_offset + width - 1), acc, fn (x, acc) ->
      Enum.reduce(top_offset..(top_offset + height - 1), acc, fn (y, acc) ->
        key = "#{x}-#{y}"

        case Map.get(acc, key) do
          nil -> Map.put(acc, key, 1)
          count -> Map.put(acc, key, count + 1)
        end
      end)
    end)
  end
end

defmodule SolutionPartTwo do
  def solve(claims) do
    parsed_claims = claims
    |> Enum.map(&Utils.parse_claim/1)

    parsed_claims
    |> Enum.find(fn claim -> !intersect?(claim, parsed_claims) end)
    |> Map.get(:id)
  end

  defp intersect?(%{left_offset: x1, top_offset: y1, width: width, height: height, id: id}, claims) do
    x2 = x1 + width
    y2 = y1 + height

    intersection = claims
    |> Enum.find(fn %{left_offset: i1, top_offset: j1, width: other_width, height: other_height, id: other_id} ->
      i2 = i1 + other_width
      j2 = j1 + other_height

      id != other_id && !((x2 <= i1 || x1 >= i2) || (y2 <= j1 || y1 >= j2))
    end)

    !is_nil(intersection)
  end
end

ExUnit.start()

defmodule SolutionTest do
  use ExUnit.Case

  alias SolutionPartOne, as: PartOne
  alias SolutionPartTwo, as: PartTwo

  test "Part I" do
    assert PartOne.solve([
      "#1 @ 1,3: 4x4",
      "#2 @ 3,1: 4x4",
      "#3 @ 5,5: 2x2"
    ]) == 4
  end

  test "Part II" do
    assert PartTwo.solve([
      "#1 @ 1,3: 4x4",
      "#2 @ 3,1: 4x4",
      "#3 @ 5,5: 2x2"
    ]) == "3"
  end
end

input = File.stream!("03.input.txt")
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
