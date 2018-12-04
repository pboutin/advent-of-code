defmodule Utils do
  def parse_log(log) do
    [minute, guard_id] = ~r/:(\d{2})\]\D+(\d+)?/
    |> Regex.run(log)
    |> case do
      [_, minute] -> [minute, nil]
      [_, minute, guard_id] -> [minute, guard_id]
    end

    %{
      minute: String.to_integer(minute),
      begins_shift?: String.contains?(log, "begins shift"),
      falls_asleep?: String.contains?(log, "falls asleep"),
      wakes_up?: String.contains?(log, "wakes up"),
      guard_id: guard_id
    }
  end

  def accumulate(%{begins_shift?: true, guard_id: guard_id}, acc) do
    acc
    |> Map.put(:current_guard, guard_id)
  end
  def accumulate(%{falls_asleep?: true, minute: minute}, acc) do
    acc
    |> Map.put(:current_sleep_minute, minute)
  end
  def accumulate(%{wakes_up?: true, minute: wake_minute}, %{current_guard: current_guard} = acc) do
    current_sleep_minute = acc
   |> Map.get(:current_sleep_minute)

    current_sleep_minute..(wake_minute - 1)
    |> Enum.reduce(ensure_guard(current_guard, acc), fn (minute, acc) ->
      str_minute = Integer.to_string(minute)
      Kernel.get_in(acc, [current_guard, str_minute])
      |> case do
         nil -> Kernel.put_in(acc, [current_guard, str_minute], 1)
         minutes -> Kernel.put_in(acc, [current_guard, str_minute], minutes + 1)
       end
    end)
  end

  def ensure_guard(guard_id, acc) do
    Map.has_key?(acc, guard_id)
    |> if do
      acc
    else
      Map.put(acc, guard_id, %{})
    end
  end
end

defmodule SolutionPartOne do
  def solve(logs) do
    rich_logs = logs
    |> Enum.map(&Utils.parse_log/1)
    |> Enum.reduce(%{}, &Utils.accumulate/2)
    |> Map.delete(:current_guard)
    |> Map.delete(:current_sleep_minute)

    guard_id = rich_logs
    |> maximum_sleep()

    {max_minute, _} = rich_logs
    |> Map.get(guard_id)
    |> Enum.max_by(fn ({_, minutes}) -> minutes end)

    String.to_integer(guard_id) * String.to_integer(max_minute)
  end

  defp maximum_sleep(rich_logs) do
    {id, _} = rich_logs
    |> Enum.max_by(fn ({_, minutes}) ->
      minutes
      |> Map.values()
      |> Enum.sum()
    end)

    id
  end
end

defmodule SolutionPartTwo do
  def solve(logs) do
    {guard_id, minutes} = logs
    |> Enum.map(&Utils.parse_log/1)
    |> Enum.reduce(%{}, &Utils.accumulate/2)
    |> Map.delete(:current_guard)
    |> Map.delete(:current_sleep_minute)
    |> maximum_sleep()

    {max_minute, _} = minutes
    |> Enum.max_by(fn ({_, minutes}) -> minutes end)

    String.to_integer(guard_id) * String.to_integer(max_minute)
  end

  defp maximum_sleep(rich_logs) do
    rich_logs
    |> Enum.max_by(fn ({_, minutes}) ->
      minutes
      |> Map.values()
      |> Enum.max_by(fn (minute) -> minute end)
    end)
  end
end

ExUnit.start()

defmodule SolutionTest do
  use ExUnit.Case

  alias SolutionPartOne, as: PartOne
  alias SolutionPartTwo, as: PartTwo

  test "Part I" do
    assert PartOne.solve([
      "[1518-11-01 00:00] Guard #10 begins shift",
      "[1518-11-01 00:05] falls asleep",
      "[1518-11-01 00:25] wakes up",
      "[1518-11-01 00:30] falls asleep",
      "[1518-11-01 00:55] wakes up",
      "[1518-11-01 23:58] Guard #99 begins shift",
      "[1518-11-02 00:40] falls asleep",
      "[1518-11-02 00:50] wakes up",
      "[1518-11-03 00:05] Guard #10 begins shift",
      "[1518-11-03 00:24] falls asleep",
      "[1518-11-03 00:29] wakes up",
      "[1518-11-04 00:02] Guard #99 begins shift",
      "[1518-11-04 00:36] falls asleep",
      "[1518-11-04 00:46] wakes up",
      "[1518-11-05 00:03] Guard #99 begins shift",
      "[1518-11-05 00:45] falls asleep",
      "[1518-11-05 00:55] wakes up"
    ]) == 240
  end

  test "Part II" do
    assert PartTwo.solve([
      "[1518-11-01 00:00] Guard #10 begins shift",
      "[1518-11-01 00:05] falls asleep",
      "[1518-11-01 00:25] wakes up",
      "[1518-11-01 00:30] falls asleep",
      "[1518-11-01 00:55] wakes up",
      "[1518-11-01 23:58] Guard #99 begins shift",
      "[1518-11-02 00:40] falls asleep",
      "[1518-11-02 00:50] wakes up",
      "[1518-11-03 00:05] Guard #10 begins shift",
      "[1518-11-03 00:24] falls asleep",
      "[1518-11-03 00:29] wakes up",
      "[1518-11-04 00:02] Guard #99 begins shift",
      "[1518-11-04 00:36] falls asleep",
      "[1518-11-04 00:46] wakes up",
      "[1518-11-05 00:03] Guard #99 begins shift",
      "[1518-11-05 00:45] falls asleep",
      "[1518-11-05 00:55] wakes up"
    ]) == 4455
  end
end

input = File.stream!("04.input.txt")
|> Stream.map(&String.trim_trailing/1)
|> Enum.to_list()
|> Enum.sort()

IO.puts("Part I")
input
|> SolutionPartOne.solve()
|> IO.puts()

IO.puts("\nPart II")
input
|> SolutionPartTwo.solve()
|> IO.puts()
