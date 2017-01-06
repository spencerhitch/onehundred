import unittest
from onehundred.solutions.numbers import *


class NumbersTestCase(unittest.TestCase):

    def test_find_pi_to_the_nth(self):
        self.assertEqual(find_pi_to_the_nth(1), 3)	
        self.assertEqual(find_pi_to_the_nth(2), 3.1)	
        self.assertEqual(find_pi_to_the_nth(3), 3.14)	
        self.assertEqual(find_pi_to_the_nth(4), 3.141)	
        self.assertEqual(find_pi_to_the_nth(5), 3.1415)	
        self.assertEqual(find_pi_to_the_nth(6), 3.14159)	
#        self.assertEqual(find_pi_to_the_nth(7), 3.141592)	
#        self.assertEqual(find_pi_to_the_nth(8), 3.1415926)
#        self.assertEqual(find_pi_to_the_nth(10), 3.141592653)

    def test_find_e_to_the_nth(self):
        e = 2.7182818284590452353602874713527
        self.assertEqual(find_e_to_the_nth(1), float(str(e)[0:1]))	
        self.assertEqual(find_e_to_the_nth(2), float(str(e)[0:3]))	
        self.assertEqual(find_e_to_the_nth(3), float(str(e)[0:4]))	
        self.assertEqual(find_e_to_the_nth(4), float(str(e)[0:5]))	
        self.assertEqual(find_e_to_the_nth(5), float(str(e)[0:6]))	
        self.assertEqual(find_e_to_the_nth(6), float(str(e)[0:7]))	
#        self.assertEqual(find_pi_to_the_nth(10), 3.141592653)

    def test_nth_fibonacci_number(self):
        fib = [1,1,2,3,5,8,13,21,34,55,89]
        self.assertEqual(nth_fibonacci_number(1), fib[1])	
        self.assertEqual(nth_fibonacci_number(2), fib[2])	
        self.assertEqual(nth_fibonacci_number(3), fib[3])	
        self.assertEqual(nth_fibonacci_number(4), fib[4])	
        self.assertEqual(nth_fibonacci_number(5), fib[5])	
        self.assertEqual(nth_fibonacci_number(6), fib[6])	

    def test_prime_factorization(self):
        self.assertEqual(prime_factorization(2), "2")	
        self.assertEqual(prime_factorization(4), "2, 2")	
        self.assertEqual(prime_factorization(6), "2, 3")	
        self.assertEqual(prime_factorization(36), "2, 2, 3, 3")	

    def test_next_prime(self):
        self.assertEqual(next_prime(), 2)
        self.assertEqual(next_prime(), 3)	
        self.assertEqual(next_prime(), 5)	

    def test_tile_cost(self):
        self.assertEqual(tile_cost(0,0,0), 0)
        self.assertEqual(tile_cost(1,1,1), 1)	
        self.assertEqual(tile_cost(1,2,1), 2)	
        self.assertEqual(tile_cost(2,2,1), 4)	
        self.assertEqual(tile_cost(2,2,2), 8)	

    def test_mortgage(self):
        self.assertEqual(mortgage(100000,30,3.92), '$473/month')
        self.assertEqual(mortgage(200000,30,3.92), '$946/month')
        self.assertEqual(mortgage(1000000,30,3.92), '$4728/month')

    def test_change_return(self):
        self.assertEqual(change_return(10.50,20), "9 bills, 2 quarters, 0 dimes, 0 nickels, and 0 pennies")
        self.assertEqual(change_return(11.27,20), "8 bills, 2 quarters, 2 dimes, 0 nickels, and 3 pennies")
        self.assertEqual(change_return(6.33,20), "13 bills, 2 quarters, 1 dimes, 1 nickels, and 2 pennies")

    def test_binary_to_decimal(self):
        self.assertEqual(binary_to_decimal('0'), '0')
        self.assertEqual(binary_to_decimal('10'), '2')
        self.assertEqual(binary_to_decimal('101'), '5')

    def test_decimal_to_binary(self):
        self.assertEqual(int(decimal_to_binary('0'), 2), int('0', 2))
        self.assertEqual(int(decimal_to_binary('10'), 2), int('1010', 2))
        self.assertEqual(int(decimal_to_binary('101'), 2), int('1100101', 2))

    def test_complex_algebra(self):
        self.assertEqual(complex_algebra("(3 + 10i) + (3 + 10i)"), "6 + 20i")
        self.assertEqual(complex_algebra("(3 + 10i) - (2 + 8i)"), "1 + 2i")

if __name__ == '__main__':
    unittest.main()
