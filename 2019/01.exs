defmodule Solution do
  def solve_part_one do
    read_input()
    |> Enum.map(&compute_fuel/1)
    |> Enum.sum()
  end

  def solve_part_two do
    read_input()
    |> Enum.map(&compute_recursive_fuel/1)
    |> Enum.sum()
  end

  def read_input do
    "01.input.txt"
    |> File.stream!()
    |> Stream.map(&String.trim_trailing/1)
    |> Enum.to_list()
    |> Enum.map(&parse_value/1)
  end

  def parse_value(raw_value) do
    {value, _} = Integer.parse(raw_value)
    value
  end

  def compute_fuel(mass) do
    mass
    |> Integer.floor_div(3)
    |> Kernel.-(2)
    |> Kernel.max(0)
  end

  def compute_recursive_fuel(0), do: 0
  def compute_recursive_fuel(mass) do
    mass
    |> compute_fuel()
    |> (& &1 + compute_recursive_fuel(&1)).()
  end
end

IO.puts("Part I")
IO.puts(Solution.solve_part_one())

IO.puts("\nPart II")
IO.puts(Solution.solve_part_two())
