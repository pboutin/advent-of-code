defmodule SolutionDayOne do
  def solve_part_one do
    try_args_pair(input(), 12, 2)
  end

  def solve_part_two do
    brute_force_args_pair(input(), 0, 0)
  end

  def brute_force_args_pair(list, noun, verb) do
    list
    |> try_args_pair(noun, verb)
    |> case do
       19690720 ->
         "#{noun}#{verb}"
      _ ->
        case verb do
          99 -> brute_force_args_pair(list, noun + 1, 0)
          _ -> brute_force_args_pair(list, noun, verb + 1)
        end
     end
  end

  def try_args_pair(list, noun, verb) do
    list
    |> List.replace_at(1, noun)
    |> List.replace_at(2, verb)
    |> run_opcode(0)
  end

  def run_opcode(list, position) do
    list
    |> Enum.slice(position, 4)
    |> opcode(list)
    |> case do
       {:next, new_list} ->
         run_opcode(new_list, position + 4)
       {:done, result} ->
         result
     end
  end

  def input, do: [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,6,23,2,23,13,27,1,27,5,31,2,31,10,35,1,9,35,39,1,39,9,43,2,9,43,47,1,5,47,51,2,13,51,55,1,55,9,59,2,6,59,63,1,63,5,67,1,10,67,71,1,71,10,75,2,75,13,79,2,79,13,83,1,5,83,87,1,87,6,91,2,91,13,95,1,5,95,99,1,99,2,103,1,103,6,0,99,2,14,0,0]

  def opcode([1, arg_one_position, arg_two_position, result_position], list) do
    arg_one = Enum.at(list, arg_one_position)
    arg_two = Enum.at(list, arg_two_position)

    {:next, List.replace_at(list, result_position, arg_one + arg_two)}
  end

  def opcode([2, arg_one_position, arg_two_position, result_position], list) do
    arg_one = Enum.at(list, arg_one_position)
    arg_two = Enum.at(list, arg_two_position)

    {:next, List.replace_at(list, result_position, arg_one * arg_two)}
  end

  def opcode([99 | _], list), do: {:done, Enum.at(list, 0)}
end

IO.puts("Part I")
IO.puts(SolutionDayOne.solve_part_one())

IO.puts("\nPart II")
IO.puts(SolutionDayOne.solve_part_two())
