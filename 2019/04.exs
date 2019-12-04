defmodule Solution do
  def solve_part_one do
    input()
    |> Enum.map(&number_to_char_array/1)
    |> Enum.filter(fn password ->
      is_only_ascending(password) && has_two_following(password)
    end)
    |> Enum.count()
  end

  def solve_part_two do
    input()
    |> Enum.map(&number_to_char_array/1)
    |> Enum.filter(fn password ->
      is_only_ascending(password) && has_two_following_strict(password)
    end)
    |> Enum.count()
  end

  def input, do: 134792..675810

  def number_to_char_array(number) do
    number
    |> Integer.to_string(10)
    |> String.split("")
    |> Enum.filter(& &1 != "")
  end

  def is_only_ascending(password), do: password == Enum.sort(password)

  def has_two_following(password) do
    password
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.any?(fn [a, b] -> a == b end)
  end

  def has_two_following_strict(password) do
    password
    |> Enum.group_by(& &1)
    |> Map.values()
    |> Enum.any?(& Enum.count(&1) == 2)
  end
end

IO.puts("Part I")
IO.puts(Solution.solve_part_one())

IO.puts("\nPart II")
IO.puts(Solution.solve_part_two())
