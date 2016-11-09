# Using the Gregory-Leibniz Series formula for pi
# Which is just the taylor series approximation of 
# artcan(1) which is of course pi/4
def find_pi_to_the_nth(n):
    n = int(n)
    estimate = 1 
    for k in range(1,10**n):
       estimate = estimate + (-1)**k * 1/(k*2 + 1)
    estimate = estimate*4
    estimate = float(str(estimate)[0:n+1])
    return estimate

def find_e_to_the_nth(n):
    n = int(n)
    k = 10**n
    estimate = (1 + 1/k)**k
    estimate = float(str(estimate)[0:n+1])
    return estimate

def nth_fibonacci_number(n):
    if n <= 1:
        return 1
    else:
        return nth_fibonacci_number(n-1) + nth_fibonacci_number(n-2)

def prime_factorization(n):
    test_factor = 2
    while n % test_factor != 0:
        test_factor += 1
    if n == test_factor:
        return str(test_factor)
    return  str(test_factor) + ", " + prime_factorization(n/test_factor)

# Variable needs to be global so we can keep track of it
current_prime = 1
def next_prime():
    global current_prime
    current_prime += 1
    while len(prime_factorization(current_prime).split(",")) != 1:
        current_prime += 1
    return current_prime

def tile_cost(w,h,c):
    return w*h*c

def mortgage(n,rate):
    return w*h*c


functions_index = [
        find_pi_to_the_nth, 
        find_e_to_the_nth, 
        nth_fibonacci_number,
        prime_factorization,
        next_prime,
        tile_cost
        ]
