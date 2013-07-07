# IPython log file

get_ipython().magic(u'logstart get_data.py')
get_ipython().system(u"curl 'http://www.census.gov/2010census/csv/pop_change.csv'")
get_ipython().system(u"wget 'http://www.census.gov/2010census/csv/pop_change.csv'")
get_ipython().system(u"wget 'http://www.census.gov/2010census/csv/pop_density.csv'")
get_ipython().system(u"wget 'http://www.census.gov/2010census/csv/apportionment.csv'")
get_ipython().system(u'#wget http://www2.census.gov/census_2010/04-Summary_File_1/Nebraska/ne2010.sf1.zip')
get_ipython().system(u'#wget http://www2.census.gov/census_2010/03-Demographic_Profile/Nebraska/ne2010.dp.zip')
get_ipython().system(u'wget http://www2.census.gov/census_2010/03-Demographic_Profile/Nebraska/0README_DPSF.pdf')
#http://www.census.gov/popest/data/cities/totals/2011/index.html
get_ipython().system(u'wget http://www.census.gov/popest/data/cities/totals/2011/files/SUB-EST2011.pdf')
get_ipython().system(u'wget http://www.census.gov/popest/data/cities/totals/2011/files/SUB-EST2011_ALL.csv')
import pandas
import pandas as pd; import numpy as np; import scipy as sp
pd.read_csv('./SUB-EST2011_ALL.csv')
pd
df=_14
df
df
df.columns
df
df['STATE']
df
df['COUNTY']
df.index
get_ipython().magic(u'pinfo pd.read_csv')
df=pd.read_csv('./SUB-EST2011_ALL.csv', index_col=7)
df
df.index
df['STATE']
df['NAME']
df['CENSUS2010POP']
df[0]
df.ix(0_
df.ix(0)
df
df.ix[0]
df.ix[1]
df.ix[0]
df.STATE
df[df.COUNTY=0]
df[df.COUNTY==0]
df[df.COUNTY==0]['NAME']
df[df.STNAME==df.NAME]
df[df.index==df.NAME]
states = df[df.index==df.NAME]
states
states['Missouri']
states.get/
get_ipython().magic(u'pinfo states.get')
states.get('Nebraska')
states.get('Missouri')
states
states[0]
states['Missouri']
states.index
states.index[31]
states.index[32]
get_ipython().magic(u'pinfo states.index.take')
states.index.get_loc('Nebraska')
states[states.index.get_loc('Nebraska')]
states.index[states.index.get_loc('Nebraska')]
states.ix[states.index.get_loc('Nebraska')]
get_ipython().magic(u'pinfo states.get')
states['delta'] = (states['POPESTIMATE2011'] - states['CENSUS2010POP']) / states['CENSUS2010POP']
states['delta'] = (states['POPESTIMATE2011'] - long(states['CENSUS2010POP'])) / long(states['CENSUS2010POP'])
states['delta'] = (states['POPESTIMATE2011'] - states['CENSUS2010POP']) / states['CENSUS2010POP'])
states['POPESTIMATE2011']
long(states['POPESTIMATE2011'])
states['POPESTIMATE2011'].apply(long)
states['POPESTIMATE2011'] = states['POPESTIMATE2011'].apply(long)
states.CENSUS2010POP = states.CENSUS2010POP.apply(long)
states['delta'] = (states['POPESTIMATE2011'] - states['CENSUS2010POP']) / states['CENSUS2010POP'])
states['delta'] = (states['POPESTIMATE2011'] - states['CENSUS2010POP']) / states['CENSUS2010POP']
states['delta']
states.CENSUS2010POP = states.CENSUS2010POP.apply(float)
states['POPESTIMATE2011'] = states['POPESTIMATE2011'].apply(float)
df=pd.read_csv('./SUB-EST2011_ALL.csv', index_col=7)
states = df[df.index==df.NAME]
states['POPESTIMATE2011'] = states['POPESTIMATE2011'].apply(float)
states.CENSUS2010POP = states.CENSUS2010POP.apply(long)
states['delta'] = (states['POPESTIMATE2011'] - states['CENSUS2010POP']) / states['CENSUS2010POP']
states['delta']
states['delta'] = states['delta'] * 100
states['delta']
states
states.describe()
get_ipython().magic(u'pinfo states.sort')
states.sort('delta')
get_ipython().magic(u'pinfo states.sort')
states.sort('delta', ascending=False)
states.sort('delta', ascending=False).head()
states.sort('delta', ascending=False).head(n=10)
states.sort('delta', ascending=False).head(n=20)
states.sort('delta', ascending=False).head(n=25)
states.sort('delta', ascending=False).head(n=30)
states.sort('delta', ascending=False).head(n=35)
echo 'lolly, lolly, lolly'
print 'lolly, lolly, lolly'
states.sort('delta', ascending=True).head(n=35)
states['delta'].sum()
(states.CENSUS2010POP - states.POPESTIMATE2011).sum()
(states.POPESTIMATE2011 - states.POPESTIMATE2011).sum()
(states.POPESTIMATE2011 - states.CENSUS2010POP).sum()
((states.POPESTIMATE2011 - states.CENSUS2010POP).sum()) / states.CENSUS2010POP.sum()
(((states.POPESTIMATE2011 - states.CENSUS2010POP).sum()) / states.CENSUS2010POP.sum()) * 100
