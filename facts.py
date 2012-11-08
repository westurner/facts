import pandas
import datetime
import calendar
from pandas import DataFrame, Index, Series
from IPython.external.path import path

datapath = path('~/workspace/math/facts').expanduser()

def get_gas_prices():
    # http://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=EMA_EPM0_PTA_NUS_DPG&f=M
    # http://www.eia.gov/dnav/pet/hist_xls/EMA_EPM0_PTA_NUS_DPGm.xls
    gas_cpg = 'EMA_EPM0_PTA_NUS_DPGm.xls'
    xls = pandas.ExcelFile(datapath / gas_cpg)
    gasdata = xls.parse( xls.sheet_names[1],skiprows=(0,1) )
    gasdata['prices'] = gasdata[gasdata.columns[1]]
    del gasdata[gasdata.columns[1]]
    gasdata['date'] = gasdata['Date']
    del gasdata['Date']
    gasdata.index = gasdata['date']
    return gasdata.resample('M',convention='end')

def clean_cpiai(path):
    def normalize(path):
        with open(path) as f:
            yield ('date','price')
            for i,l in enumerate(f):
                l = l.strip()
                if i > 17:
                    l = l.strip()
                    if l:
                        fields = l.split()
                        year = int(fields[0])
                        for n,f in enumerate( fields[1:-3] ):
                            yield (
                                datetime.date(
                                    year,
                                    n+1,
                                    # assume figures are for EOM
                                    calendar.monthrange(
                                        year, n+1)[-1]
                                    ).isoformat() , f )
                            #yield "%s-%s" % (fields[0],n+1), f
                        #yield ','.join(fields)

    output = "%s.cleaned.csv" % path
    with file(output,'w') as f:
        for line in normalize(path):
            f.write(','.join(line))
            f.write('\n')
        #cleancpi.writelines( normalize(path) )
        f.close()
    return output

def get_inflation():
    # ftp://ftp.bls.gov/pub/special.requests/cpi/cpiai.txt
    cpi = clean_cpiai( datapath / 'cpiai.txt' )
    csv = pandas.read_csv(cpi, sep=',', header=0, parse_dates=True, index_col=0)
    return csv


if __name__=="__main__":
    gd = get_gas_prices()
    inf = get_inflation()


    df = DataFrame(index=inf.index)
    df['gas'] = gd['prices']
    df['cpi'] = inf['price']
    df.plot()
