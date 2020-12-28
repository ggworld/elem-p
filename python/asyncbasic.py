import asyncio
import random
import time


async def main(i):
    print('hello')
    await asyncio.sleep(random.randint(1,3))
    # time.sleep(random.randint(1, 3))
    print(i)

async def my_loop():
    await asyncio.gather(*[main(i) for i in range(5)])

if __name__ == "__main__":
    asyncio.run(my_loop())
