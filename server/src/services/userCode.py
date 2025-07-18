import time
import multiprocessing

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5)+1):
        if n % i == 0:
            return False
    return True

def count_primes_in_range(start, end):
    count = 0
    for num in range(start, end):
        if is_prime(num):
            count += 1
    return count

def cpu_intensive_task():
    start_time = time.time()
    num_cores = multiprocessing.cpu_count()
    print(f"Using {num_cores} cores")

    # Define a huge range
    RANGE_END = 100_000_000
    chunk_size = RANGE_END // num_cores

    # Set up multiprocessing
    with multiprocessing.Pool(processes=num_cores) as pool:
        ranges = [(i * chunk_size, (i + 1) * chunk_size) for i in range(num_cores)]
        results = pool.starmap(count_primes_in_range, ranges)

    total_primes = sum(results)
    elapsed_time = time.time() - start_time
    print(f"Total primes found: {total_primes}")
    print(f"Elapsed time: {elapsed_time:.2f} seconds")

if __name__ == "__main__":
    cpu_intensive_task()
