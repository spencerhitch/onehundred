import math

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

def mortgage(principal,period,i):
    r = i/12/100
    n  = period*12
    monthly = principal * (r*(r+1)**n / ((1+r)**n - 1))
    return "$" + str(int(round(monthly))) + "/month"

def change_return(cost, tender):
    change = tender - cost
    bills = math.floor(change)
    change = int((change - bills) * 100)
    purse = [bills, 0,0,0,0]

    def coins(change):
        if change == 0:
            return
        elif change >= 25:
            purse[1] += 1
            return coins(change - 25)
        elif change >= 10:
            purse[2] += 1
            return coins(change - 10)
        elif change >= 5:
            purse[3] += 1
            return coins(change - 5)
        elif change >= 1:
            purse[4] += 1
            return coins(change - 1)

    coins(change)
    result = "{0} bills, {1} quarters, {2} dimes, {3} nickels, and {4} pennies".format(*purse)
    return result

def decimal_to_binary(b):
    b_int = int(b)
    res = ""
    for i in range(32):
        if (2**(31 - i) & b_int != 0):
            res = res+"1"
        else:
            res = res+"0"
    return res

def binary_to_decimal(b):
    sb = str(b)
    return str(sum((ord(c)-48)*2**i for i,c in enumerate(sb[::-1])))

def tax_calculator(c,t):
    tax  = c * t / 100
    return "Tax: " + str(tax) + " Total Cost: $" +  str(c + tax)


functions_index = [
        find_pi_to_the_nth, 
        find_e_to_the_nth, 
        nth_fibonacci_number,
        prime_factorization,
        next_prime,
        tile_cost,
        mortgage,
        change_return,
        decimal_to_binary,
        binary_to_decimal,
        "calculator",
        "unit_converter",
        "alarm_clock",
        "distance",
        "card_validator",
        tax_calculator
        ]
