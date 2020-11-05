#with run this promo
import getpass,random
q='wDphTKemnnBH kQaJZrSJeID GTyKYofIuBI mzcuHaQflJUlSRiWHnnEgdu?TK'
a=['today','now','just did','in 5']
n=getpass.getuser()
print('{}, {}'.format(n,''.join([x for n,x in enumerate(q) if n%3==0])))
print('{}!'.format(random.choice(a)))
